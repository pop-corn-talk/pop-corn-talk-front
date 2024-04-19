import { List, message } from "antd";
import React, { useEffect, useState } from "react";
import { postGetClient } from "../../../../api/client";
import axios from "axios";

export function PopularPost3({ renderItem }) {
  const [postTop3Data, setTop3Data] = useState([]);

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
    getContentTop3();
  }, []);

  return (
    <List
      header={<div>지난달 인기 게시글 top3</div>}
      className="top3-posts" // Apply the top3-posts class here
      itemLayout="horizontal"
      dataSource={postTop3Data}
      renderItem={renderItem}
    />
  );
}
