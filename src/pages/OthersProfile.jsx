import React, { useState, useEffect } from 'react';
import { getOtherUserInfo } from '../api/usersInfo'; // Assuming you have an apiClient module

function Profiles() {
    const [userInfo, setUserInfo] = useState(null); // Using useState hook to manage state

    useEffect(() => {
        // Function to execute when the component mounts
        handleButtonClick();
    }, []);

    const handleButtonClick = () => {
        getOtherUserInfo(1)
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
