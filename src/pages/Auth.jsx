/** @jsxImportSource @emotion/react */
import { useIsShown } from "../hooks/useIsShown";
import { mainContainer } from "../shared/globalStyle";
import Login from "../component/auth/login";
import SignUp from "../component/auth/signUp";

const Auth = () => {
  // useAuth();
  const [isShown, onOpen, onClose, loginCount] = useIsShown();
  return (
    <section css={mainContainer}>
      <SignUp onOpen={onOpen} onClose={onClose} />
      <Login isShown={isShown} onOpen={onOpen} loginCount={loginCount} />
    </section>
  );
};

export default Auth;
