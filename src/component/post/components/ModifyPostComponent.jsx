import { Button, Input, List, Typography } from "antd";

const ModifyPostComponent = ({postData,postComment}) => {

  function handleCommentChange(e) {
    setPostComment(e.target.value);
  }









  return (
    <>
      <article key={postData.id} id="posts">
        <Typography.Title level="2" id="post_name" editable>
          {postData.name}
        </Typography.Title>
        <p id="post_content">{postData.content}</p>
        <img id="post_imgPreview" src={postData.image} alt="Post Image" />
        <div className="border-t p-4 flex items-center space-x-2">
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
    </>
  );
};
export default ModifyPostComponent;
