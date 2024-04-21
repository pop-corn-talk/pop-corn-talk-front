import React from "react";
export const NotificationComponent = ({ notification }) => {
  if (!notification) return null; // 알림이 없으면 아무것도 표시하지 않음
  // 알림 컴포넌트의 UI를 작성합니다.
  return (
    <div className="notification">
      <p>{notification.sender}</p>
      <p>{notification.contents}</p>
      <p>{notification.time}</p>
    </div>
  );
};
