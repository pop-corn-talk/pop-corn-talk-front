/** @jsxImportSource @emotion/react */
import { ToastContainer } from "react-toastify";
import notice from "../../../utils/noticeUtils";
import { signUpApi } from "../../../api/auth";
import useSignForm from "../../../hooks/useSignForm";
import * as authSytle from "../authStyle";
import { signUperrorWrapper, signUplabelCss } from "./style";
import React from "react";
const SignUp = ({ onOpen, onClose }) => {
  const {
    userInfo,
    handleInputValue,
    emailIsAbled,
    emailWarnList,
    passwordIsAbled,
    passwordWarnList,
  } = useSignForm();

  const handleSignUpClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    signUpApi(userInfo.email, userInfo.password)
      .then(() => {
        e.target.reset();
        notice("success", "회원가입 성공");
        onOpen();
      })
      .catch((err) => {
        notice("error", "회원가입 실패");
      });
    localStorage.setItem("justSignedIn", "true");
  };

  return (
    <form onSubmit={handleSignUpClick}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <label aria-hidden="true" css={signUplabelCss} onClick={onClose}>
        Sign up
      </label>

      <input
        type="text"
        placeholder="이메일 주소 형식을 지켜주세요"
        required=""
        // eslint-disable-next-line react/no-unknown-property
        css={authSytle.inputCss}
        onChange={handleInputValue("email")}
      />
      <input
        type="password"
        placeholder="8글자~20자, 대소문자,숫자,특수문자를 포함하세요."
        required=""
        // eslint-disable-next-line react/no-unknown-property
        css={authSytle.inputCss}
        onChange={handleInputValue("password")}
      />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <div css={signUperrorWrapper}>
        {emailWarnList?.map((item) => (
          <div key={item}>{item}</div>
        ))}
        {passwordWarnList?.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>

      <authSytle.AuthButton
        disabled={!emailIsAbled || !passwordIsAbled}
        emailisabled={emailIsAbled.toString()}
        passwordisabled={passwordIsAbled.toString()}
      >
        Sign up
      </authSytle.AuthButton>
      <ToastContainer position="top-right" />
    </form>
  );
};

export default SignUp;
