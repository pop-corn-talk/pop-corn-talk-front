import React, { useState, useEffect } from "react";
import { getUserInfo } from "../api/usersInfo";
import { Link } from "react-router-dom";
import "./css/profile.css";

function Profiles() {
  const [userInfo, setUserInfo] = useState(null); // Using useState hook to manage state

  useEffect(() => {
    // Function to execute when the component mounts
    handleButtonClick();
  }, []);

  const handleButtonClick = () => {
    getUserInfo()
      .then((res) => {
        console.log("success", "조회 성공 : " + res.data.data.email);
        setUserInfo(res.data.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };
  //
  function ToUserPage() {
    return (
      <button>
        <Link to="/users/listpage?page=1">other profile</Link>
      </button>
    );
  }
  function ToHome() {
    return (
      <button>
        <Link to="/">Home</Link>
      </button>
    );
  }
  return (
    <div>
      <ToUserPage />
      <ToHome />
      {userInfo && (
        <div className="container">
          <div className="details">
            <h2>User Info</h2>
            <a className="label">Email : </a>
            <a className="value">{userInfo.email} </a>
            <p className="label">오늘 남은 포인트 얻기: {userInfo.dailyPostsLimit}</p>
            <p className="label">포인트: {userInfo.point}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profiles;
