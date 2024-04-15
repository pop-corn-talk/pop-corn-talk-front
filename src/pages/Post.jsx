import React, { Link } from "react";
import CreatePostList from "../component/post/createPostList";
import GetPostsListComponent from "../component/post/getPostList";
import ButtonToUserProfile from "./ButtonToUserProfile";

const Post = () => {
  return (
    <section>
      {/* CreatePostList 컴포넌트 렌더링 */}
      <ButtonToUserProfile />
      <CreatePostList />
      <GetPostsListComponent />
      {/* GetPosts 컴포넌트 렌더링 */}
    </section>
  );
};

export default Post;
