import React from "react";

import GetPostsListComponent from "../component/post/getPostList";
import Navbar from "../navbar/navbar";
const GetPost = () => {
  return (
    <section>
      {/* CreatePostList 컴포넌트 렌더링 */}
      <Navbar />
      <GetPostsListComponent />
      {/* GetPosts 컴포넌트 렌더링 */}
    </section>
  );
};
export default GetPost;
