import { Button, Modal, Popconfirm } from "antd";
import ModifyNRemovePostComponent from "../../components/ModifyNRemovePostComponent";
import React, { useEffect, useState } from "react";
import { commentGetClient } from "../../../../api/client";

const getContentComment = async (postId) => {
  const url = `posts/${postId}/comments`;

  try {
    const response = await commentGetClient.get(url);
    const responseData = await response.data.data;
    // comment를 리턴해준다.
    if (responseData) {
      return responseData.content; // Update postComment state with the received comment data
    }
  } catch (error) {
    return []; // Set postComment to an empty array in case of error
  }
};

export const PostDetails = ({ open, setOpen, postData, setPostData }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [isLoading, setIsLoading] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!postData) {
      return;
    }
    // postData.getComments(postId).then((res) => {})
    getContentComment(postData.id).then((response) => setPostComments(response));
    setIsLoading(false);
  }, [postData]);

  function handleOk() {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  }

  function handleCancelClick() {
    setPostData(null);
    setOpen(false);
    setIsEditing(false);
  }

  return (
    <Modal
      title={modalText}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => {
        handleCancelClick();
      }}
    >
      {/* onclick={loadModalData()} */}

      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        // onConfirm={confirm}
        // onCancel={cancel}
        okText="Yes"
        cancelText="No"
      ></Popconfirm>
      {postData && (
        <ModifyNRemovePostComponent
          postData={postData}
          getContentComment={getContentComment}
          postComments={postComments}
          setPostComments={setPostComments}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </Modal>
  );
};
