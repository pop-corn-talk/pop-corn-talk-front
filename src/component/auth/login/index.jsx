/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { loginApi } from "../../../api/auth";
import notice from "../../../utils/noticeUtils";
import useSignForm from "../../../hooks/useSignForm";
import * as authSytle from "../authStyle";
import { LoginContainer, loginErrorWrapper, loginLabelCss } from "./style";
import base64 from "base-64";
import { header } from "../../post/createPostList/style";
import { subscribeApi } from "../../../api/notification";
import { useState, useEffect } from "react";
import { message } from "antd";
const url = process.env.REACT_APP_API_URL_LOCAL;

const LoginComponent = ({ isShown, onOpen }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // Define userId state
  const [loginCount, setLoginCount] = useState(0); // Define loginCount state

  const {
    userInfo,
    handleInputValue,
    emailIsAbled,
    emailWarnList,
    passwordIsAbled,
    passwordWarnList,
  } = useSignForm();

  const handleLoginClick = () => {
    loginApi(userInfo.email, userInfo.password).then((res) => {
      const authorizationHeader = res.headers["authorization"];
      const accessToken = authorizationHeader.split(" ")[1];
      console.log("accessToken", accessToken);
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("justLoggedIn", "true");
      // Wait for userId to be set
      const storedLoginCount = localStorage.getItem(`loginCount_${userId}`);
      if (!storedLoginCount) {
        // 값이 null 또는 유효한 숫자 형식이 아닌 경우 처리
        console.error("Invalid loginCount value found in localStorage.");
        localStorage.setItem(`loginCount_${userId}`, 1);
        setLoginCount(1);
        message.info("처음 가입하셨습니다! 1000포인트가 지급되었습니다");
        navigate("/post"); // Redirect to todo page
      } else {
        // 유효한 숫자 형식인 경우 처리
        const newLoginCount = parseInt(storedLoginCount) + 1;
        localStorage.setItem(`loginCount_${userId}`, newLoginCount);
        setLoginCount(newLoginCount); // Update loginCount state
        navigate("/post"); // Redirect to todo page
      }
    });
  };

  // useEffect to fetch and set userId on component mount
  useEffect(() => {
    const userIdFromToken = getUserIdFromAccessToken();
    if (userIdFromToken) {
      setUserId((prevUserId) => {
        // Update the state using a callback function to avoid dependency on userId
        if (!prevUserId) {
          // If userId is not already set, update it
          return userIdFromToken;
        }

        const storedLoginCount = localStorage.getItem(`loginCount_${userIdFromToken}`);
        if (!storedLoginCount) {
          console.error("Invalid loginCount value found in localStorage.");
          localStorage.setItem(`loginCount_${userIdFromToken}`, 1);
          setLoginCount(1);
          message.info("처음 가입하셨습니다! 1000포인트가 지급되었습니다");
          navigate("/post"); // Redirect to todo page
        } else {
          const newLoginCount = parseInt(storedLoginCount) + 1;
          localStorage.setItem(`loginCount_${userIdFromToken}`, newLoginCount);
          setLoginCount(newLoginCount);
          navigate("/post"); // Redirect to todo page
        }
        return prevUserId; // Return previous userId
      });
    }
  }, []);

  function getUserIdFromAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      let payload = accessToken.substring(
        accessToken.indexOf(".") + 1,
        accessToken.lastIndexOf(".")
      );
      let dec = base64.decode(payload);
      const jsonParse = JSON.parse(dec);
      return jsonParse.userId;
    }
    return null; // userId가 없는 경우 null 반환
  }

  return (
    <>
      <LoginContainer isShown={isShown} onSubmit={(e) => e.preventDefault()}>
        <label aria-hidden="true" onClick={onOpen} css={loginLabelCss}>
          Login
        </label>
        <input
          css={authSytle.inputCss}
          type="text"
          placeholder="Email"
          required=""
          onChange={handleInputValue("email")}
        />
        <input
          css={authSytle.inputCss}
          type="password"
          placeholder="Password"
          required=""
          onChange={handleInputValue("password")}
        />
        <div css={loginErrorWrapper}>
          {emailWarnList?.map((item) => (
            <div key={item}>{item}</div>
          ))}
          {passwordWarnList?.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>

        <authSytle.AuthButton
          onClick={handleLoginClick}
          disabled={!emailIsAbled || !passwordIsAbled}
          emailisabled={emailIsAbled.toString()}
          passwordisabled={passwordIsAbled.toString()}
        >
          Login
        </authSytle.AuthButton>
      </LoginContainer>
      <ToastContainer position="top-right" />
    </>
  );
};

export default LoginComponent;
