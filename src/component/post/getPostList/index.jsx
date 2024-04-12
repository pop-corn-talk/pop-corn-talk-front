import React, { useState, useEffect } from "react";

const DisplayNewPost = ({ postData }) => {
  console.log(postData);
  return (
    <>
      {postData.map((post) => (
        <article key={post.id} className="post-card">
          <h2>{post.name}</h2>
          <p>{post.content}</p>
          <img src={post.image} alt="Post Image" />
        </article>
      ))}
    </>
  );
};

const GetPosts = () => {
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0); // 페이지 번호

  const getPosts = async () => {
    try {
      setLoadingPosts(true);

      const size = 10; // 한 페이지에 표시할 게시물 수
      const url = `http://localhost:8080/posts?type=0&keyword=&page=${page}&size=${size}`;

      const token = localStorage.getItem("access_token");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch posts. Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (
        responseData &&
        responseData.data &&
        responseData.data.content &&
        responseData.data.content.length > 0
      ) {
        setPosts((prevPosts) => [...prevPosts, ...responseData.data.content]);
      } else {
        console.log("No more posts available.");
      }
    } catch (error) {
      console.error("An error occurred while fetching posts:", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    // 페이지가 처음 로드될 때 데이터 가져오기
    getPosts();
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 함

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight) {
      // 페이지 끝에 도달한 경우
      setPage((prevPage) => prevPage + 1); // 페이지 번호 업데이트
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // 마운트될 때만 이벤트 리스너를 추가/제거

  useEffect(() => {
    // 페이지 번호가 변경될 때마다 데이터 가져오기
    if (page > 0) {
      getPosts();
    }
  }, [page]); // 페이지 번호가 변경될 때마다 실행되도록 함

  return <DisplayNewPost postData={posts} />;
};

export default GetPosts;
