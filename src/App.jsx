/** @jsxImportSource @emotion/react */
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { mainContainer } from "./shared/globalStyle";
import  Profiles  from "./pages/Profiles";
import  Headers  from "./pages/Headers";

// const Todo = lazy(() => import("./pages/Post"));

console.log(process.env.REACT_APP_API_URL);

function App() {
  return (
    <>
    <Headers/>
    <Routes>
      
      <Route path="/" element={<Auth />} />

      <Route
        path="/todo"
        element={
          <Suspense fallback={<div css={mainContainer}>...로딩중</div>}>
            
          </Suspense>
        }
      />
      <Route path="/users/profile" element={<Profiles />}/>
    </Routes>
    </>
  );
}

export default App;
