import React from "react";
import { Link } from "react-router-dom";

const MainNavbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">Logo</h1>
        <ul className="nav-links">
          <Link to="/Auth">
            <li>
              <a>회원가입, 로그인</a>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default MainNavbar;