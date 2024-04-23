/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { loginApi } from "../../../api/auth";
import useSignForm from "../../../hooks/useSignForm";
import { message } from "antd";
import { ToastContainer } from "react-toastify";
import * as authStyle from "../authStyle";
import { buttonCss } from "../authStyle";
import { LoginContainer, loginErrorWrapper, loginLabelCss } from "./style";
import { css } from "@emotion/react";
import { COLOR } from "../../../shared/style";

const LoginComponent = ({ isShown, onOpen, accessToken, setAccessToken }) => {
  const navigate = useNavigate();
  const {
    userInfo,
    handleInputValue,
    emailIsAbled,
    emailWarnList,
    passwordIsAbled,
    passwordWarnList,
  } = useSignForm();

  async function setToken(token) {
    setAccessToken(token);
  }

  const handleLoginClick = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await loginApi(userInfo.email, userInfo.password);
      const authorizationHeader = res.headers["authorization"];
      const splitedToken = authorizationHeader.split(" ")[1];
      await setToken(splitedToken);
      if (token && splitedToken) {
        localStorage.removeItem("access_token");
        localStorage.setItem("access_token", splitedToken);
      } else if (!splitedToken) {
        message.error("새로운 토큰 에러 발생");
      }
      localStorage.setItem("justLoggedIn", "true");
      message.info("환영합니다. 회원가입이 완료되어 1000포인트가 지급되었습니다.");
      navigate("/post");
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Failed to login.");
    }
  };

  useEffect(() => {
    console.log("accessToken", accessToken);
  }, [accessToken]);

  return (
    <>
      <LoginContainer isShown={isShown} onSubmit={(e) => e.preventDefault()}>
        <label
          aria-hidden="true"
          onClick={onOpen}
          // eslint-disable-next-line react/no-unknown-property
          css={css`
            ${loginLabelCss}
          `}
        >
          Login
        </label>
        <input
          // eslint-disable-next-line react/no-unknown-property
          css={css`
            ${authStyle.inputCss}
          `}
          type="text"
          placeholder="Email"
          required=""
          onChange={handleInputValue("email")}
        />
        <input
          // eslint-disable-next-line react/no-unknown-property
          css={css`
            ${authStyle.inputCss}
          `}
          type="password"
          placeholder="Password"
          required=""
          onChange={handleInputValue("password")}
        />
        <div className={loginErrorWrapper}>
          {emailWarnList?.map((item) => (
            <div key={item}>{item}</div>
          ))}
          {passwordWarnList?.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              backgroundColor:
                emailIsAbled === false || passwordIsAbled === false ? "gray" : `${COLOR.Purple200}`,
              ...buttonCss,
              color: "white",
              borderRadius: "5%",
              width: "50%",
              height: "40px",
              border: "none",
              marginTop: "25px",
              cursor: "pointer",
            }}
            onClick={handleLoginClick}
            disabled={!emailIsAbled || !passwordIsAbled}
            data-emailisabled={emailIsAbled.toString()}
            data-passwordisabled={passwordIsAbled.toString()}
          >
            Login
          </button>
        </div>
      </LoginContainer>
      <ToastContainer position="top-right" />
    </>
  );
};

export default LoginComponent;
