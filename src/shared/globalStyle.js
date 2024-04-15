import { css } from "@emotion/react";
import { COLOR } from "./style";

export const customBodyStyle = css`
  body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: "Jost", sans-serif;
  }
`;

export const mainContainer = css`
  width: 350px;
  height: 530px;
  overflow: hidden;
  background: #ecc957;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
`;
