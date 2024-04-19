import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { postGetClient } from "../../../../api/client";
const SIZE = 10; // 한 페이지에 표시할 게시물 수
export function NoticedList({ renderItem }) {
  const [noticedData, setNoticedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // 페이지 번호

  async function loadNoticedData() {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await postGetClient.get("/posts/notice", {
        params: {
          page: page,
          size: SIZE,
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

  useEffect(() => {
    loadNoticedData().then();
  }, []);
  useEffect(() => {
    setPage(0);
    console.log(page);
    setNoticedData([]);
  }, []);
  return (
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
        scrollableTarget="scrollableNoticedDiv"
      >
        <List header={<div>공지 게시글</div>} dataSource={noticedData} renderItem={renderItem} />
      </InfiniteScroll>
    </div>
  );
}
