import { useCallback, useState } from "react";
import useValidate from "./useValidate";

// useSignForm 커스텀 훅 정의
const useSignForm = () => {
  // 이메일 유효성 검사에 필요한 상태와 함수들
  const [emailIsAbled, emailWarnList, oncheckEmail] = useValidate("email");
  // 비밀번호 유효성 검사에 필요한 상태와 함수들
  const [passwordIsAbled, passwordWarnList, oncheckPassword] = useValidate("password");

  // 사용자 정보 상태 초기화
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // 입력 값 변경 핸들러
  const handleInputValue = useCallback(
    (key) => (e) => {
      // 입력 값 변경 시 해당 상태 업데이트
      setUserInfo({ ...userInfo, [key]: e.target.value });

      // 이메일 입력 시 이메일 유효성 검사 실행
      if (key === "email") {
        oncheckEmail(e.target.value);
      }
      // 비밀번호 입력 시 비밀번호 유효성 검사 실행
      if (key === "password") {
        oncheckPassword(e.target.value);
      }
    },
    [userInfo] // userInfo 상태가 변경될 때마다 새로운 콜백 함수 생성
  );

  // 사용자 정보 및 유효성 검사 결과 반환
  return {
    userInfo,
    setUserInfo,
    handleInputValue,
    emailIsAbled,
    emailWarnList,
    passwordIsAbled,
    passwordWarnList,
  };
};

export default useSignForm;
