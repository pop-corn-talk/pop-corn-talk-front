import { React } from "react";
import CreatePostList from "../component/post/createPostList";
import GetPostsListComponent from "../component/post/getPostList";
import { Link } from "react-router-dom";
const Post = () => {
  return (
    <section>
      <CreatePostList />
      <button>
        <Link to="/getPost">게시글 전체보기</Link>
      </button>
      {/* <GetPostsListComponent /> */}
    </section>
  );
};

export default Post;
