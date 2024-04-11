import React, { useState, useEffect } from "react";
import { getUserInfoPage } from "../api/usersInfo"; // Assuming you have an apiClient module

function OtherProfiles() {
  const [userInfoList, setUserInfoList] = useState(null);
  // state change-> re-rendering
  const params = new URLSearchParams(document.location.search);
  useEffect(() => {
    getlist(params.get("page"));
  }, []);

  const getlist = (pages) => {
    getUserInfoPage(pages).then((res) => {
        console.log(res)
      setUserInfoList(res.data.data.content);
    });
  };

  return (
    <div style={{ width: 700, height: 700, backgroundColor: "white", display:"block"}}>
        <br />
      <div style={{ width: 600, height: 500, backgroundColor: "white",marginTop:30,marginLeft:100}}>
      <h2 style={{ marginTop: 30, margin: 20 }}>User Info : page {params.get("page")}</h2>
      <p style={{display:"block"}}>
      {userInfoList && (
        <ol>
          {userInfoList.map(userInfo => <li> :  {userInfo.email}</li>)}
        </ol>
      )}
      </p>
      </div>
      </div>
  );
}

export default OtherProfiles;
