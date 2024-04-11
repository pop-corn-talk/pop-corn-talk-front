/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { getTodoApi } from "../api/todo";

import useAuth from "../hooks/useAuth";
import { mainContainer } from "../shared/globalStyle";
import TodoContextWrapper from "../context/TodoContext";

const Post = () => {
  useAuth();

  // const [todoData, setTodoData] = useState();

  // useEffect(() => {
  //   const getData = () => {
  //     getTodoApi()
  //       .then((res) => {
  //         setTodoData(res.data);
  //       })
  //       .catch((err) => {
  //         throw new Error(err);
  //       });
  //   };
  //   getData();
  // }, []);

  return (
    <section css={mainContainer}>
      <PostList />
    </section>
  );
};

export default Post;
