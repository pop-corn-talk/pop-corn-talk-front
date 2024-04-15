import React, { useState } from "react";

import GetPostsListComponent from "../component/post/getPostList";
const getPost = () => {
  return (
    <section>
      {/* CreatePostList 컴포넌트 렌더링 */}
      <GetPostsListComponent />
      {/* GetPosts 컴포넌트 렌더링 */}
    </section>
  );
};
export default getPost;
