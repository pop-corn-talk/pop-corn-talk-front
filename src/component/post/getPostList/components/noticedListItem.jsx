import { Avatar, List } from "antd";
import React from "react";

export const NoticedListItem = ({ item, onClick }) => (
  <List.Item>
    <List.Item.Meta
      avatar={<Avatar src={item.image} />}
      title={item.name}
      onClick={onClick}
      description={item.email}
    />
  </List.Item>
);
