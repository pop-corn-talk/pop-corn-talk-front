import React, { useState } from "react";
import GetPosts from "../component/post/getPostList";
import CreatePostList from "../component/post/createPostList";

const Post = () => {
  const [page, setPage] = useState(1); // 페이지 번호

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight) {
      // 페이지 끝에 도달한 경우
      setPage((prevPage) => prevPage + 1); // 페이지 번호 업데이트
    }
  };

  React.useEffect(() => {
    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section>
      {/* CreatePostList 컴포넌트 렌더링 */}
      <CreatePostList />
      {/* GetPosts 컴포넌트 렌더링 */}
      <GetPosts page={page} />
    </section>
  );
};

export default Post;
