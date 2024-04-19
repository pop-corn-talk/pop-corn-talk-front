import React, { useEffect, useState } from "react";
import { Cascader, Input } from "antd";

import { postGetClient } from "../../../api/client";
import "../../../pages/css/post.css";
import { PopularPost3Item } from "./components/PopularPost3Item";
import { PopularPost3 } from "./components/PopularPost3";
import { PostList } from "./components/postList";
import { PostListItem } from "./components/PostListItem";
import { NoticedList } from "./components/noticedList";
import { NoticedListItem } from "./components/noticedListItem";
import { PostDetails } from "./components/PostDetails";

const SIZE = 10; // 한 페이지에 표시할 게시물 수

const OPTIONS = [
  {
    value: 2,
    label: "postName",
  },
  {
    value: 1,
    label: "userEmail",
  },
];

//todo : 데이터 추가됐을때 리로딩 없이 데이터 받아오기
const GetPostListComponent = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // 페이지 번호
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState(null); // 선택된 게시물의 ID
  const [postData, setPostData] = useState(null); // 선택된 게시물의 데이터
  const [searchKeyword, setSearchKeyword] = useState(""); // State for search keyword
  const [selectedType, setSelectedType] = useState(0);

  const { Search } = Input;

  async function loadMoreData() {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await postGetClient.get("/posts", {
        params: {
          type: selectedType !== null ? selectedType : 0,
          keyword: searchKeyword,
          page: page,
          size: SIZE,
        },
      });

      const responseData = await response?.data?.data;
      console.log(responseData);

      if (responseData && selectedType === 0) {
        setData((prev) => [...prev, ...responseData.content]);
        setPage(page + 1); // Update the page number
      } else if (responseData && selectedType !== 0) {
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

  async function showModal(postId) {
    setOpen(true);
    setPostId(postId); // 선택된 게시물의 ID 설정
    console.log("postId", postId);
  }

  function handleTypeChange(value) {
    setSelectedType(value[0]);
    console.log("typeVluae", value[0]);
  }

  function handleKeywordChange(e) {
    setSearchKeyword(e.target.value);
    console.log("keywordValue", e.target.value);
  }

  useEffect(() => {
    setPage(0);
    setData([]);
  }, [searchKeyword, selectedType]);
  // 모달 관련 함수들은 이전과 동일하게 사용

  return (
    <>
      <Cascader
        placeholder="검색하실 타입을 지정해주세요"
        options={OPTIONS}
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

      <PopularPost3 renderItem={(item, index) => <PopularPost3Item index={index} item={item} />} />

      <NoticedList
        renderItem={(item) => (
          <NoticedListItem key={item.id} item={item} onClick={() => showModal(item.id)} />
        )}
      />

      <PostList
        next={loadMoreData}
        data={data}
        renderItem={(item) => (
          <PostListItem key={item.id} item={item} onClick={() => showModal(item.id)} />
        )}
        stateOpen={{ open, setOpen }}
        postId={postId}
        postData={postData}
        setPostData={setPostData}
      />

      <PostDetails
        open={open}
        setOpen={setOpen}
        postData={postData}
        setPostData={setPostData}
      ></PostDetails>
    </>
  );
};

export default GetPostListComponent;
