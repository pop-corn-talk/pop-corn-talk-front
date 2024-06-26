import React, { useState, Link, useEffect } from "react";

import "../../../pages/css/post.css";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { body } from "./style";
import { apiClient, imageClient } from "../../../api/client";
const url = process.env.REACT_APP_API_URL_LOCAL;

const CreatePostList = ({ loginCount }) => {
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    if (loginCount == 1) {
      console.log("첫 로그인을 환영합니다");
      message.info("로그인에 성공했습니다! 1000포인트가 지급되었습니다");
    } else {
      console.log("환영합니다");
    }
  }, []);

  function handleNameChange(e) {
    setPostName(e.target.value);
  }

  function handleContentChange(e) {
    setPostContent(e.target.value);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setPostImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit() {
    // 이미지 파일이 선택되었는지 확인
    if (!postImage) {
      console.error("이미지를 선택하세요.");
      return;
    }

    // 게시글 제목과 내용이 입력되었는지 확인
    if (!postName || !postContent) {
      console.error("게시글 제목 또는 내용을 입력하세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Image", postImage);
      //todo : url 하드
      const imageUploadResponse = await imageClient.post("/image", formData);
      const imageUrl = imageUploadResponse.data?.data?.imageUrl;

      // 이미지 URL을 설정하여 이미지 미리보기 엘리먼트를 업데이트
      setImgPreview(imageUrl);

      const postData = {
        postName: postName,
        postContent: postContent,
        postImage: imageUrl,
      };
      console.log(postData);

      const postResponse = await apiClient.post("/posts", postData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.message);
      }
      console.log("게시글 등록에 실패했습니다.", error);
    }
  }

  return (
    <div>
      <article id="posts">
        <div class="post-container">
          <p id="post_name">
            <input
              type="text"
              id="post_nameInput"
              placeholder="게시글 제목을 작성해주세요"
              value={postName}
              onChange={handleNameChange}
            />
          </p>

          <h3 id="post_content">
            <input
              type="text"
              id="post_contentInput"
              placeholder="게시글 내용을 입력해주세요"
              value={postContent}
              onChange={handleContentChange}
            />
          </h3>

          <img
            id="post_imgPreview"
            src={imgPreview}
            alt="Post Image"
            style={{ display: imgPreview ? "block" : "none" }}
          />

          <input
            type="file"
            id="post_imgInput"
            placeholder="게시글 이미지를 업로드해주세요"
            onChange={handleImageChange}
          />

          <button id="post_submitBtn" onClick={handleSubmit}>
            게시글 등록
          </button>
        </div>
      </article>
    </div>
  );
};

export default CreatePostList;
