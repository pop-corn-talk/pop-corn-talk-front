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
import { notificationApi } from "../../../api/notification";
const Login = ({ isShown, onOpen }) => {
  const navigate = useNavigate();
  const {
    userInfo,
    handleInputValue,
    emailIsAbled,
    emailWarnList,
    passwordIsAbled,
    passwordWarnList,
  } = useSignForm();

  const handleLoginClick = () => {
    // 로그인 버튼 클릭시 -> 구독 서비스 get요청 -> 구매했을때 notification을 한번 거쳐야함
    loginApi(userInfo.email, userInfo.password).then((res) => {
      const authorizationHeader = res.headers["authorization"];
      // Extract Authorization header
      if (authorizationHeader) {
        const accessToken = authorizationHeader.split(" ")[1]; // Extract token from Authorization header
        console.log("Access Token:", accessToken); // Log token value
        localStorage.setItem("access_token", accessToken); // Store token in local storage

        let payload = accessToken.substring(
          accessToken.indexOf(".") + 1,
          accessToken.lastIndexOf(".")
        );
        let dec = base64.decode(payload);
        const jsonParse = JSON.parse(dec);
        const userId = jsonParse.userId;
        notice("success", "로그인 성공");

        // problem : 알림을 보내기위해서 유저 pk가 필요한데 토큰값이 암호화되어있어서 그상태로 유저정보를 추출이 불가능했음.
        // think : 토큰값에 id값과 만료시간 등등 토큰 정보가 저장되어있을것..
        // try 1 : 토큰값 받은것을 그대로 parsing하려함.
        // try 2 : base64형태로 decode함.
        // try 3 : decode한 데이터를 json으로 파싱함.
        // solution : base64로 decoding하여 json으로 파싱했음.
        console.log("0");
        notificationApi(userId)
          //
          .then((res) => {
            console.log(res);
            if (res.status == "success") {
              console.log("알림 성공!!");
            } else {
              console.error("알림 실패");
            }
          })
          .then(() => {
            navigate("/post"); // Redirect to todo page
          });
      } else {
        console.error("Authorization header not found in response."); // Log error if Authorization header is missing
      }
    });
  };

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

export default Login;
