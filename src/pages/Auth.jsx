/** @jsxImportSource @emotion/react */
import { useIsShown } from "../hooks/useIsShown";
import { mainContainer } from "../shared/globalStyle";
import Login from "../component/auth/login";
import SignUp from "../component/auth/signUp";
import React from "react";
const Auth = ({ accessToken, setAccessToken }) => {
  // useAuth();
  const [isShown, onOpen, onClose, loginCount] = useIsShown();

  return (
    // eslint-disable-next-line react/no-unknown-property
    <section css={mainContainer}>
      <SignUp onOpen={onOpen} onClose={onClose} />
      <Login
        isShown={isShown}
        onOpen={onOpen}
        loginCount={loginCount}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />
    </section>
  );
};

export default Auth;
