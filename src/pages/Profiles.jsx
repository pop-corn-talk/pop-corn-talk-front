import React, { useState, useEffect } from "react";
import { getUserInfo } from "../api/usersInfo";
import "./css/profile.css";
import Navbar from "../navbar/navbar";

export default function Profiles() {
  const [userInfo, setUserInfo] = useState(null); // Using useState hook to manage state

  useEffect(() => {
    handleButtonClick();
  }, []);

  const handleButtonClick = () => {
    getUserInfo()
      .then((res) => {
        console.log("success", "조회 성공 : " + res.data.data.email);
        console.log(res)
        setUserInfo(res.data.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  return (
    <div>
      <Navbar/>
      {userInfo && (
        <div className="profilecontainer">
          <div className="details">
            <h2>User Info</h2>
            <br /> 
            <div style={{margin:"auto",width:200}}>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" />
            <br />     
            <br />    
            <a className="label">Email : </a>
            <a className="value">{userInfo.email} </a>
            <p className="label">오늘 남은 포인트 얻기: {userInfo.dailyPostsLimit}</p>
            <p className="label">포인트: {userInfo.point}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

