import React, { useState } from "react";
import GetPostsListComponent from "../component/post/getPostList";
import MainNavbar from "../component/mainNavbar/mainNavbar"

const Home = () => {
  return (
    <section>
      <MainNavbar />
      {/* CreatePostList 컴포넌트 렌더링 */}
      <GetPostsListComponent />
      {/* GetPosts 컴포넌트 렌더링 */}
    </section>
  );
};
export default Home;