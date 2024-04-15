import React from "react";
import { Link } from "react-router-dom";
export default function ButtonToUserProfile() {
  return (
    <button>
      <Link to="/users/profile">내 프로필 보기</Link>
    </button>
  );
}
