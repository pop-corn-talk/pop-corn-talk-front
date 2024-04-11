import React, { useState } from 'react';
import { getUserInfo } from '../api/usersInfo'; // Assuming you have an apiClient module
import notice from '../utils/noticeUtils';

function Profiles() {
    const [userInfo, setUserInfo] = useState(null); // Using useState hook to manage state

    const handleButtonClick = () => {
        getUserInfo(1)
          .then((res) => {
            console.log("success", "조회 성공 : " + res.data.data.email);
            setUserInfo(res.data.data.email); // Updating userInfo using setUserInfo
          })
          .catch((err) => {
            console.log("error");
          });
    };

    return (
        <div>
            <h2>User Info</h2>
            <button onClick={handleButtonClick}>Get User Info</button>
            {userInfo && (
                <div>
                    <p>Email: {userInfo}</p>
                    {/* Add more user info fields as needed */}
                </div>
            )}
        </div>
    );
}

export default Profiles;
