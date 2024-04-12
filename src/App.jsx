/** @jsxImportSource @emotion/react */
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { mainContainer } from "./shared/globalStyle";
import Profiles from "./pages/Profiles";
import ButtonToUserProfile from "./pages/ButtonToUserProfile";
import OtherProfiles from "./pages/OthersProfile";

const Todo = lazy(() => import("./pages/Post"));

console.log(process.env.REACT_APP_API_URL);

function App() {
  return (
    <>
      <ButtonToUserProfile />
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route
          path="/post"
          element={
            <Suspense fallback={<div css={mainContainer}>...로딩중</div>}>
              <Todo />
            </Suspense>
          }
        />
        <Route path="/users/profile" element={<Profiles />} />
        <Route path="/users/listpage" element={<OtherProfiles />} />
      </Routes>
    </>
  );
}

export default App;
