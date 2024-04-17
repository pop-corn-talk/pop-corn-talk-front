/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import Profiles from "./pages/Profiles";
import OtherProfiles from "./pages/OthersProfile";
import ProductOrder from "./pages/ProductOrder";
import Navbar from "./navbar/navbar";
import GetPostListComponent from "./component/post/getPostList";
import Home from "./pages/Home";

const Post = lazy(() => import("./pages/CreatePost"));

function App() {
  return (
    <>
      <Routes>
        < Route path="/" element={<Home />} />
        <Route path="/Auth" element={<Auth />} />
        <Route
          path="/post"
          element={
            <Suspense fallback={<div>...로딩중</div>}>
              <Navbar />
              <Post />
            </Suspense>
          }
        />
        <Route path="/getPost" element={<GetPostListComponent />} />
        <Route path="/users/profile" element={<Profiles />} />
        <Route path="/users/listpage" element={<OtherProfiles />} />
        <Route path="/products/shopping" element={<ProductOrder />} />
      </Routes>
    </>
  );
}

export default App;
