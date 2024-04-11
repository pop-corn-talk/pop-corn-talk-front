import React, { useState, useEffect } from "react";

const DisplayNewPost = ({ postData }) => {
  return (
    <>
      {postData.map((post) => (
        <article className="post-card">
          <h2>{post.name}</h2>
          <p>{post.content}</p>
          <img src={post.image} alt="Post Image" />
        </article>
      ))}
    </>
  );
};

// Your GetPosts component with potential adjustments

// Imports

const GetPosts = () => {
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Adjusted to 1-based indexing

  const getPosts = async (currentPage) => {
    try {
      setLoadingPosts(true);

      const size = 10;
      const url = `http://localhost:8080/posts?type=0&keyword=&page=${currentPage}&size=${size}`;

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
      console.log("responseData", responseData);

      if (responseData && responseData.data && responseData.data.content) {
        const newPosts = responseData.data.content;
        if (newPosts.length > 0) {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          setPage(currentPage + 1); // Updated page number
        } else {
          console.log("No more posts available.");
        }
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
    getPosts(page); // Fetch initial posts when the component mounts
  }, []); // Empty dependency array to run only once on mount

  const handleScroll = async () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight && !loadingPosts) {
      try {
        await getPosts(page); // Fetch next page of posts
      } catch (error) {
        console.error("An error occurred while fetching posts:", error);
      }
    }
  };

  useEffect(() => {
    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove scroll event listener when component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to add/remove listener only once

  // Fetch new posts after a new post is created
  useEffect(() => {
    getPosts(1); // Fetch latest posts after a new post is created
  }, []); // Run only on initial mount

  return <DisplayNewPost postData={posts} />;
};

export default GetPosts;
