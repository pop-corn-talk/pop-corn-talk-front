import { useEffect, useState } from "react";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { json } from "react-router-dom";
import { message } from "antd";

export const useNotification = (accessToken) => {
  const [notification, setNotification] = useState("");
  const handleEventSource = (eventSource) => {
    console.log("eventSource", eventSource);
    eventSource.onmessage = (event) => {
      try {
        console.log("Raw message data:", JSON.parse(event.data));
        setNotification(event.data);
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    };
  };
  // 이벤트를 잡을수 있는 api를 백엔드에서 처리를해줘야하나??
  // sendProduct를 잡아올수있는 방법.
  if (!accessToken) {
    return;
  }
  const url = process.env.REACT_APP_API_URL_LOCAL;

  try {
    const eventSource = new EventSourcePolyfill(`${url}/notification/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    handleEventSource(eventSource);
    eventSource.addEventListener("sendProduct", (event) => {
      const parsedData = JSON.parse(event.data);
      const sender = parsedData.sender; // Access sender property directly
      setNotification(parsedData);
      message.success(sender).then();
    });
    eventSource.addEventListener("addComment", (event) => {
      const parsedData = JSON.parse(event.data);
      const sender = parsedData.sender; // Access sender property directly
      setNotification(parsedData);
      message.success(sender).then();
    });
  } catch (error) {
    console.error("Error creating EventSource:", error);
  }
};
