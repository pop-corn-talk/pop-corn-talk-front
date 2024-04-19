import { Avatar, List } from "antd";
import React from "react";

export const PopularPost3Item = ({ index, item }) => (
  <List.Item className="top3-posts-item">
    <List.Item.Meta
      avatar={
        <Avatar
          className="top3-posts-avatar"
          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
        />
      } // Apply the top3-posts-avatar class here
      title={item.name}
      description={item.email}
    />
  </List.Item>
);
