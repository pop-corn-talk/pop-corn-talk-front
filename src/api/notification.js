import { apiClient } from "./client";
const url = process.env.REACT_APP_API_URL;

export const subscribeApi = async (userId) => {
  console.log("1");
  try {
    const eventSource = new EventSource(
      `/notification/subscribe`, // 서버의 API 주소를 넣으면 된다
      { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } } // 세션 쿠키를 실어보내기 위함 (선택사항)
    );
    console.log("eventSource", eventSource);
  } catch (error) {
    console.error("Error occurred while fetching notifications:", error);
    throw error;
  }
};
