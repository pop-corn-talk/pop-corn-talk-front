import React, { Link } from "react";
import CreatePostList from "../component/post/createPostList";
import GetPostsListComponent from "../component/post/getPostList";

const Post = () => {
  return (
    <section>
      {/* CreatePostList 컴포넌트 렌더링 */}
      <CreatePostList />
      <GetPostsListComponent />
      {/* GetPosts 컴포넌트 렌더링 */}
    </section>
  );
};

export default Post;
