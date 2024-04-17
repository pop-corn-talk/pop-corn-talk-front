import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, Divider, List, Skeleton, Modal, Input, Button } from "antd";
import { apiClient } from "../../../api/client";
const url = process.env.REACT_APP_API_URL_LOCAL;

//todo : 데이터 추가됐을때 리로딩 없이 데이터 받아오기
const GetPostListComponent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0); // 페이지 번호
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [postId, setPostId] = useState(null); // 선택된 게시물의 ID
  const [postData, setPostData] = useState(null); // 선택된 게시물의 데이터
  const [postComment, setPostComment] = useState([]);
  const size = 10; // 한 페이지에 표시할 게시물 수

  async function loadMoreData() {
    if (loading) {
      return;
    }

    const nextPage = page + 1; // Calculate the next page number

    setLoading(true);
    console.log("Fetching data for page:", nextPage); // Log the page being fetched

    try {
      const response = await apiClient.get("/posts", {
        params: {
          type: 0,
          keyword: "",
          page: nextPage - 1,
          size: size,
        },
      });

      console.log("Response for page", nextPage, ":", response); // Log the response object

      const responseData = await response?.data?.data;

      if (responseData?.content?.length) {
        console.log("Received data for page", nextPage, ":", responseData.content); // Log the received data
        setData([...data, ...responseData.content]);
        setPage(nextPage); // Update the page number
      }
    } catch (error) {
      // if (Axios.isAxiosError(error)) {
      console.error(error.message);
      // }
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function showModal(postId) {
    console.log("게시글 아이디입니다", postId);
    setOpen(true);
    setPostId(postId); // 선택된 게시물의 ID 설정
    await getContentComment(postId);
  }

  function handleOk() {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  }

  function handleCancel() {
    console.log("Clicked cancel button");
    setOpen(false);
  }
  async function postContentComment(postId) {
    const url = `/posts/${postId}/comments`;
    const data = {
      content: postComment,
    };
    const response = await apiClient.post(url, data);
    if (response != null) {
      console.log("response입니다", response);
    }
  }

  async function getContentComment(postId) {
    const url = `/posts/${postId}/comments`;

    try {
      const response = await apiClient.get(url);
      console.log("response", response);
      const responseData = await response.data.data;
      console.log("클릭된 게시글 id 기준 댓글 조회 type", response);
      console.log("클릭된 게시글 id 기준 댓글 조회 data:", responseData); // Log the response data

      if (responseData) {
        console.log("Received comment data:", responseData.content); // Log the received comment data
        setPostComment(responseData.content); // Update postComment state with the received comment data
      }
    } catch (error) {
      setPostComment([]); // Set postComment to an empty array in case of error
    } finally {
      setLoading(false); // Update loading state after data fetching is complete
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (postId) {
      // postId가 변경될 때만 해당 게시물 데이터를 가져옴
      apiClient
        .get(`/posts/${postId}`)
        .then((response) => response?.data?.data)
        .then((postData) => {
          setPostData(postData);
          console.log("클릭한 게시글 id 기준 조회 data", postData);
          console.log(22);
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    }
  }, [postId]);

  useEffect(() => {
    loadMoreData();
    console.log(33);
  }, []);

  useEffect(() => {
    console.log(postComment); // Log postComment inside useEffect
  }, [postComment]); // Log whenever postComment changes

  function handleCommentChange(e) {
    setPostComment(e.target.value);
  }

  // 모달 관련 함수들은 이전과 동일하게 사용

  return (
    <div
      id="scrollableDiv"
      x
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
        next={loadMoreData}
        hasMore={true} // 항상 true로 설정하여 계속해서 데이터를 불러올 수 있도록 함
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
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={item.name}
                onClick={() => showModal(item.id)}
                description={item.email}
              />
              <div className="item-content">{item.content}</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>

      <Modal
        title="Title"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {postData && (
          <article key={postData.id} id="posts">
            <h2 id="post_name">{postData.name}</h2>
            <p id="post_content">{postData.content}</p>
            <img id="post_imgPreview" src={postData.image} alt="Post Image" />
            <div className="border-t p-4 flex items-center space-x-2">
              {/* <InfiniteScroll
                dataLength={postComment.length}
                next={() => getContentComment(postId)} // Call getContentComment with the postId parameter
                hasMore={true} // Always set to true to allow data to continue to be loaded
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />} // Display skeleton to indicate loading before scrolling reaches end
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>} // Message displayed when there are no more comments
                scrollableTarget="scrollableDiv"
              >
                <List
                  dataSource={postComment} // Use postComment state directly
                  renderItem={(comment) => (
                    <List.Item key={comment.content.id}>
                      <div>{comment}</div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll> */}
              {postComment && (
                <List
                  className="comment-list"
                  dataSource={postComment}
                  renderItem={(comment) => (
                    <List.Item key={comment.id}>
                      <List.Item.Meta
                        title={comment.content}
                        description={`Posted by: ${comment.email}`}
                        // avatar={<Avatar src={item.image} />}
                      />
                    </List.Item>
                  )}
                />
              )}
              <Input
                className="flex-grow"
                placeholder="Type a message..."
                onChange={handleCommentChange}
              />
              <Button
                variant="outline"
                onClick={() => {
                  postContentComment(postData.id);
                }}
              >
                Send
              </Button>
              <button onClick={() => getContentComment(postData.id)}>댓글 로딩확인</button>
            </div>
          </article>
        )}
      </Modal>
    </div>
  );
};

export default GetPostListComponent;
