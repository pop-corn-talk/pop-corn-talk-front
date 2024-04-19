import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List, Skeleton } from "antd";
import { PostDetails } from "./PostDetails";
import React, { useEffect, useState } from "react";
import { commentGetClient, postGetClient } from "../../../../api/client";

export const PostList = ({ stateOpen, data, next, renderItem, postId, postData, setPostData }) => {
  const [loading, setLoading] = useState(false);
  const [postComment, setPostComment] = useState([]);
  async function getContentComment(postId) {
    const url = `posts/${postId}/comments`;

    try {
      const response = await commentGetClient.get(url);
      const responseData = await response.data.data;
      // comment를 리턴해준다.
      if (responseData) {
        setPostComment(responseData.content); // Update postComment state with the received comment data
      }
    } catch (error) {
      setPostComment([]); // Set postComment to an empty array in case of error
    } finally {
      setLoading(false); // Update loading state after data fetching is complete
    }
  }
  // 요렇게 사용하셈
  // setPostComment(getContentComment(postId)); // Update postComment state with the received comment data

  useEffect(() => {
    next();
  }, []);

  useEffect(() => {
    if (postId) {
      // postId가 변경될 때만 해당 게시물 데이터를 가져옴
      postGetClient
        .get(`/posts/${postId}`)
        .then((response) => response?.data?.data)
        .then((postData) => {
          setPostData(postData);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    }
  }, [postId]);

  return (
    <div
      id="scrollableDiv"
      style={{
        width: 800,
        height: 800,
        borderRadius: 15,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={next}
        hasMore
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List dataSource={data} renderItem={renderItem} />
      </InfiniteScroll>

      <PostDetails
        stateOpen={stateOpen}
        postData={postData}
        setPostData={setPostData}
        getContentComment={getContentComment}
      />
    </div>
  );
};
