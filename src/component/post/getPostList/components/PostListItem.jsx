import { Avatar, List } from "antd";
import React from "react";

export const PostListItem = ({ item, onClick }) => (
  <List.Item>
    <List.Item.Meta
      avatar={<Avatar src={item.image} />}
      title={item.name}
      onClick={onClick}
      description={item.email}
    />
    <div className="item-content">{item.content}</div>
  </List.Item>
);
