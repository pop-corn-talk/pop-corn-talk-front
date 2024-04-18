import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Avatar,
  Button,
  Divider,
  Input,
  List,
  Modal,
  Skeleton,
  message,
  Cascader,
  Popconfirm,
  Typography,
} from "antd";

import { apiClient, commentGetClient, commentPostClient, postGetClient } from "../../../api/client";
import axios from "axios";
import "../../../pages/css/post.css";
import ModifyPostComponent from "../components/ModifyPostComponent";
const url = process.env.REACT_APP_API_URL_LOCAL;

//todo : 데이터 추가됐을때 리로딩 없이 데이터 받아오기
const GetPostListComponent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [noticedData, setNoticedData] = useState([]);
  const [searchedData, setSearchedData] = useState([]); // 검색 결과 저장
  const [page, setPage] = useState(0); // 페이지 번호
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [postId, setPostId] = useState(null); // 선택된 게시물의 ID
  const [postData, setPostData] = useState(null); // 선택된 게시물의 데이터
  const [searchKeyword, setSearchKeyword] = useState(""); // State for search keyword
  const [selectedType, setSelectedType] = useState(0);
  const [postComment, setPostComment] = useState([]);
  const [postTop3Data, setTop3Data] = useState([]);

  const { Search } = Input;

  const size = 10; // 한 페이지에 표시할 게시물 수

  const options = [
    {
      value: 2,
      label: "postName",
    },
    {
      value: 1,
      label: "userEmail",
    },
  ];
  async function loadMoreData() {
    if (loading) {
      return;
    }

    // Calculate the next page number

    setLoading(true);
    try {
      const response = await postGetClient.get("/posts", {
        params: {
          type: selectedType !== null ? selectedType : 0,
          keyword: searchKeyword,
          page: page,
          size: size,
        },
      });

      const responseData = await response?.data?.data;
      console.log(responseData);

      if (responseData && selectedType == 0) {
        setData((prev) => [...prev, ...responseData.content]);
        setPage(page + 1); // Update the page number
      } else if (responseData && selectedType != 0) {
        setData((prev) => [...prev, ...responseData.content]);
        setPage(page + 1); // Update the page number
        console.log("searchedData", responseData.content);
      }
      console.log(page);
    } catch (error) {
      // if (Axios.isAxiosError(error)) {
      console.error(error.message);
      // }
    } finally {
      setLoading(false);
    }
  }
  async function loadNoticedData() {
    if (loading) {
      return;
    }

    // Calculate the next page number

    setLoading(true);
    try {
      const response = await postGetClient.get("/posts/notice", {
        params: {
          page: page,
          size: size,
        },
      });
      console.log(response);
      const responseData = await response?.data?.data;
      console.log(responseData);

      if (responseData) {
        setNoticedData((prev) => [...prev, ...responseData.content]);
        setPage(page + 1); // Update the page number
      }
      console.log(page);
    } catch (error) {
      // if (Axios.isAxiosError(error)) {
      console.error(error.message);
      // }
    } finally {
      setLoading(false);
    }
  }

  // async function loadSearchedData() {
  //   if (loading) {
  //     return;
  //   }

  //   // const nextPage = page + 1; // Calculate the next page number

  //   setLoading(true);
  //   console.log("selectedType", selectedType);
  //   try {
  //     const response = await postGetClient.get("/posts", {
  //       params: {
  //         type: selectedType !== null ? selectedType : 0,
  //         keyword: searchKeyword, // Use the searchKeyword state variable here
  //         page: 0,
  //         size: size,
  //       },
  //     });
  //     const responseData = await response?.data?.data;
  //     if (responseData) {
  //       setSearchedData([...searchedData, ...responseData.content]);
  //       console.log("searchedData", responseData.content);
  //       // setPage(nextPage); // Update the page number
  //     }
  //   } catch (error) {
  //     // Handle errors
  //     console.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function showModal(postId) {
    setOpen(true);
    setPostId(postId); // 선택된 게시물의 ID 설정
    console.log("postId", postId);
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
    setOpen(false);
  }

  async function postContentComment(postId) {
    const url = `/posts/${postId}/comments`;
    const data = {
      content: postComment,
    };
    try {
      const response = await commentPostClient.post(url, data);
    } catch (error) {}
  }

  async function getContentComment(postId) {
    const url = `posts/${postId}/comments`;

    try {
      const response = await commentGetClient.get(url);
      const responseData = await response.data.data;

      if (responseData) {
        setPostComment(responseData.content); // Update postComment state with the received comment data
      }
    } catch (error) {
      setPostComment([]); // Set postComment to an empty array in case of error
    } finally {
      setLoading(false); // Update loading state after data fetching is complete
    }
  }

  async function getContentTop3() {
    const url = `/posts/best`;

    try {
      const response = await postGetClient.get(url);
      const responseData = await response.data;
      if (responseData) {
        setTop3Data(responseData.data);
        // useState의 특성. -> useState 비동기.
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.message);
      }
    }
  }

  useEffect(() => {
    loadMoreData();
  }, []);
  useEffect(() => {
    setPage(0);
    setData([]);
  }, [searchKeyword, selectedType]);

  useEffect(() => {}, [postComment]); // Log whenever postComment changes

  useEffect(() => {
    getContentTop3();
  }, []);
  useEffect(() => {
    loadNoticedData();
  }, []);
  useEffect(() => {
    setPage(0);
    console.log(page);
    setNoticedData([]);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
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

  function handleTypeChange(value) {
    setSelectedType(value[0]);
    console.log("typeVluae", value[0]);
  }
  function handleKeywordChange(e) {
    setSearchKeyword(e.target.value);
    console.log("keywordValue", e.target.value);
  }
  // 모달 관련 함수들은 이전과 동일하게 사용

  return (
    <>
      <Cascader
        placeholder="검색하실 타입을 지정해주세요"
        options={options}
        onChange={handleTypeChange}
      />
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={loadMoreData}
        onChange={handleKeywordChange}
        // onChange={}
      />

      <>
        <List
          header={<div>지난달 인기 게시글 top3</div>}
          className="top3-posts" // Apply the top3-posts class here
          itemLayout="horizontal"
          dataSource={postTop3Data}
          renderItem={(item, index) => (
            <List.Item className="top3-posts-item">
              <List.Item.Meta
                avatar={
                  <Avatar
                    className="top3-posts-avatar"
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                } // Apply the top3-posts-avatar class here
                title={item.name}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </>
      <>
        <div
          id="scrollableNoticedDiv"
          style={{
            width: 300,
            height: 270,
            borderRadius: 15,
            overflow: "auto",
            padding: "0 16px",

            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={noticedData.length}
            next={loadNoticedData}
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
            scrollableTarget="scrollableNoticedDiv"
          >
            <List
              header={<div>공지 게시글</div>}
              dataSource={noticedData}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} />}
                    title={item.name}
                    onClick={() => showModal(item.id)}
                    description={item.email}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </>

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
          {/* onclick={loadModalData()} */}
          <Button type="primary">수정</Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            // onConfirm={confirm}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>삭제</Button>
          </Popconfirm>
          {postData && <ModifyPostComponent />}
        </Modal>
      </div>
    </>
  );
};

export default GetPostListComponent;
