import React, { useState } from "react";

const PostList = () => {
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [imgPreview, setImgPreview] = useState("");

  const handleNameChange = (e) => {
    setPostName(e.target.value);
  };

  const handleContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
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
      const postData = {
        postName: postName,
        postContent: postContent,
        // You may choose to send the base64 encoded image data instead of the file object
        postImage: imgPreview,
      };

      const token = sessionStorage.getItem("jwt");

      const response = await fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("게시글 등록에 실패했습니다.");
      }
      console.log("게시글 등록에 성공했습니다.");

      // 게시글 카드를 동적으로 생성하여 postsContainer에 추가
      // 이 부분은 리액트의 상태를 업데이트하여 화면을 갱신하는 방식으로 변경할 수 있습니다.
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="center-container">
      <article id="posts" className="post-card">
        <button onClick={handleSubmit}>게시글 등록</button>
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
      </article>
    </div>
  );
};

export default PostList;
