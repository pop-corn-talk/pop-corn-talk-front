import { Button, Image, Input, List, message, Typography } from "antd";
import { commentPostClient, imageClient, postPostClient } from "../../../api/client";
import axios from "axios";
import { useState } from "react";
import React from "react";
import error from "eslint-plugin-react/lib/util/error";
const ModifyNRemovePostComponent = ({
  postComments,
  setPostComments,
  postData,
  getContentComment,
  isEditing,
  setIsEditing,
}) => {
  const [postName, setPostName] = useState(postData.name);
  const [postContent, setPostContent] = useState(postData.content);
  const [inputComments, setInputComments] = useState("");
  const [postImage, setPostImage] = useState(postData.image);
  const [imgPreview, setImgPreview] = useState(postData.image);
  function handleCommentChange(e) {
    setInputComments(e.target.value);
  }

  async function postContentComment(postId) {
    const url = `/posts/${postId}/comments`;
    const data = {
      content: inputComments,
    };
    try {
      const response = await commentPostClient.post(url, data);
      if (response) {
        message.info("댓글 작성이 완료되었습니다다");
        window.location.reload();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.message);
      }
      console.error(error);
    }
  }

  function handleNameChange(value) {
    setPostName(value);
  }
  function handleContentChange(value) {
    setPostContent(value);
  }
  // editing true => 수정완료 handleSubmit
  function handleImageChange(e) {
    const file = e.target.files[0];
    setPostImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImgPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
  async function submitModifiedPost() {
    const formData = new FormData();
    formData.append("Image", postImage);
    //todo : url 하드
    const imageUploadResponse = await imageClient.post("/image", formData);
    const imageUrl = imageUploadResponse.data?.data?.imageUrl;
    console.log("imageUrl", imageUrl);
    // 이미지 URL을 설정하여 이미지 미리보기 엘리먼트를 업데이트
    setImgPreview(imageUrl);
    // setIsEditing(true);
    const modifiedData = {
      postName: postName,
      postContent: postContent,
      postImage: imageUrl,
    };
    console.log(postImage);
    try {
      const url = `/posts/${postData.id}`;
      const response = await postPostClient.put(url, modifiedData);
      if (response) {
        message.success("게시글 수정이 완료되었습니다.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.message);
      }
      console.error(error);
    }
  }
  async function handleDeletePost() {
    try {
      const url = `/image/delete`;
      // const formData = new FormData();
      // formData.append("Image", postImage);
      // const data = {
      //   imageUrl: postImage,
      // };
      const response = await postPostClient.delete(url + "?imageUrl=" + postImage);
      if (response) {
        message.info("이미지 삭제가 완료되었습니다");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.message);
      }
      console.error(error);
    }
    try {
      const deleteUrl = `/posts/${postData.id}`;
      const response = await postPostClient.delete(deleteUrl);
      console.log(response);
      if (response) {
        message.success("게시글 삭제가 완료되었습니다.");
      }
    } catch (e) {
      if (axios.isAxiosError(error)) {
        message.error(error.message);
      }
      console.error(error);
    }
  }
  function handleEditClick() {
    // 현재 상태가 !editing 이 번튼을 누르면 editing
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // 현재 상태가 editing에서 이 버튼을 누르면 submit
    submitModifiedPost().then();
    setIsEditing(false);
  }

  return (
    <>
      <Button type="primary" onClick={handleEditClick}>
        {isEditing ? "수정 완료" : "수정"}
      </Button>
      <Button
        danger
        onClick={() => {
          handleDeletePost().then();
        }}
      >
        삭제
      </Button>
      <article key={postData.id} id="posts">
        <Typography.Title
          level={2}
          id="post_name"
          editable={isEditing && { onChange: handleNameChange }}
        >
          {postName}
        </Typography.Title>

        <Typography.Paragraph
          id="post_content"
          editable={isEditing && { onChange: handleContentChange }}
        >
          {postContent}
        </Typography.Paragraph>

        <Image id="post_imgPreview" preview={false} src={imgPreview} alt="Post Image"></Image>
        {isEditing && (
          <Input
            type="file"
            id="post_imgInput"
            placeholder="게시글 이미지를 업로드해주세요"
            onChange={handleImageChange}
          />
        )}

        <div className="border-t p-4 flex items-center space-x-2">
          {postComments && (
            <List
              className="comment-list"
              dataSource={postComments}
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
              postContentComment(postData.id).then();
            }}
          >
            Send
          </Button>
          <button onClick={() => getContentComment(postData.id)}>댓글 로딩확인</button>
        </div>
      </article>
    </>
  );
};
export default ModifyNRemovePostComponent;
