import { apiClient } from "./client";
const url = process.env.REACT_APP_API_URL_LOCAL;

export const subscribeApi = async (userId) => {
  try {
    const eventSource = new EventSource(
      `/notification/subscribe`, // 서버의 API 주소를 넣으면 된다
      { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } } // 세션 쿠키를 실어보내기 위함 (선택사항)
    );
  } catch (error) {
    console.error("Error occurred while fetching notifications:", error);
    throw error;
  }
};
// useEfeect로 api호출하고 , 받아온 ㄴ데이터를 useState에 set하면된다.
