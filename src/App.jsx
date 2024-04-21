/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Auth from "./pages/Auth";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import Profiles from "./pages/Profiles";
import OtherProfiles from "./pages/OthersProfile";
import ProductOrder from "./pages/ProductOrder";
import Navbar from "./navbar/navbar";
import Home from "./pages/Home";
import GetPost from "./pages/getPost";
import { useNotification } from "./hooks/useNotification";

const Post = lazy(() => import("./pages/CreatePost"));

function App() {
  const [notification, setNotification] = useState(null); // 알림 상태 추가
  const [accessToken, setAccessToken] = useState(null); // accessToken 추가
  useNotification(accessToken);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Auth"
          element={<Auth accessToken={accessToken} setAccessToken={setAccessToken} />}
        />
        <Route
          path="/post"
          element={
            <Suspense fallback={<div>...로딩중</div>}>
              <Navbar />
              <Post />
            </Suspense>
          }
        />
        <Route path="/getPost" element={<GetPost />} />
        <Route path="/users/profile" element={<Profiles />} />
        <Route path="/users/listpage" element={<OtherProfiles />} />
        <Route
          path="/products/shopping"
          element={<ProductOrder setNotification={setNotification} />}
        />
      </Routes>
    </>
  );
}

export default App;
