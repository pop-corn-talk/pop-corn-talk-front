import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
export default function Navbar() {
  return (
    <nav class="navbar">
      <div class="container">
        <h1 class="logo">Logo</h1>
        <ul class="nav-links">
          <Link to="/">
            <li>
              <a
                onClick={() => {
                  localStorage.removeItem("access_token");
                }}
              >
                로그아웃
              </a>
            </li>
          </Link>
          <Link to="/getPost">
            <li>
              <a>게시판</a>
            </li>
          </Link>
          <Link to="/products/shopping">
            <li>
              <a>상품들</a>
            </li>
          </Link>
          <Link to="/users/profile">
            <li>
              <a>내 프로필</a>
            </li>
          </Link>
          <Link to="/users/listpage?page=1">
            <li>
              <a>유저 리스트</a>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
