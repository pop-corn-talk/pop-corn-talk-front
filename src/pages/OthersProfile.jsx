import React, { useState, useEffect } from "react";
import { getUserInfoPage } from "../api/usersInfo"; // Assuming you have an apiClient module
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import "./css/profile.css";

function OtherProfiles() {
  const [userInfoList, setUserInfoList] = useState(null);
  const navigate = useNavigate();
  // state change-> re-rendering
  const params = new URLSearchParams(document.location.search);
  const pagenNum = params.get("page");
  useEffect(() => {
    getlist(pagenNum);
  }, []);

  const getlist = (pages) => {
    getUserInfoPage(pages).then((res) => {
      console.log(res);
      setUserInfoList(res.data.data.content);
    });
  };
  // 버튼
  const navigateToPage = (pageNumber) => {
    window.location.href = `/users/listpage?page=${pageNumber}`;
  };
  //
  return (
    <div style={{ width: 840, height: 900, backgroundColor: "white", display: "block" }}>
      <Navbar />

      <br />
      <div
        style={{
          width: 600,
          height: 500,
          backgroundColor: "white",
          marginTop: 30,
          marginLeft: 100,
        }}
      >
        <h2 style={{ marginTop: 30, margin: 20 }}>User Info List : page {pagenNum}</h2>
        <div style={{ display: "block" }}>
          {userInfoList && (
            <ol>
              {userInfoList.map((userInfo) => (
                <li key={userInfo.email}> {userInfo.email}</li>
              ))}
            </ol>
          )}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button className="button" onClick={()=>navigateToPage(1)}>1 </button>
        <button className="button" onClick={()=>navigateToPage(2)}>2 </button>
        <button className="button" onClick={()=>navigateToPage(3)}>3 </button>
      </div>
    </div>
  );
}

export default OtherProfiles;
