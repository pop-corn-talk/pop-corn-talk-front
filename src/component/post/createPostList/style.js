import { css } from "@emotion/react";

export const body = css`
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
`;

export const header = css`
  background-color: #212121;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 60px;
`;

export const h1 = css`
  margin: 0;
  font-size: 20px;
`;

export const welcomeMessage = css`
  color: #ffcc00;
`;

export const leftContainer = css`
  margin-top: 80px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
`;

export const centerContainer = css`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const postCard = css`
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 300px;
  margin: 10px;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const postCardHover = css`
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
`;

export const postCardExpanded = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  z-index: 10;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const postCardContentExpanded = css`
  padding: 30px;
`;

export const postCardTitleExpanded = css`
  font-size: 24px;
`;

export const postCardBodyExpanded = css`
  font-size: 18px;
`;

export const postCardImg = css`
  width: 100%;
  border-radius: 15px 15px 0 0;
`;

export const modal = css`
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const modalContent = css`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;

export const close = css`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const inputText = css`
  padding: 10px;
  border-radius: 20px;
  border: none;
  margin-right: 10px;
  width: 200px;
`;

export const button = css`
  padding: 10px 20px;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 15px;
`;

export const loginBtn = css`
  background-color: #4caf50;

  &:hover {
    background-color: #004080;
  }
`;

export const signupBtn = css`
  background-color: #2196f3;

  &:hover {
    background-color: #004080;
  }
`;
