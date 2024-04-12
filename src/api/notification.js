import { apiClient } from "./client";

export const notificationApi = async (userId) => {
  console.log("1");
  try {
    // // 헤더에 인증 토큰을 포함하여 요청 보내기
    // const response = await apiClient.get("http://localhost:8080/notification/subscribe", {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //   },
    //   responseType: "stream",
    // });
    // console.log("response", response);
    // return response.data;

    const eventSource = new EventSource(
      `http://localhost:8080/notification/subscribe`, // 서버의 API 주소를 넣으면 된다
      { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } } // 세션 쿠키를 실어보내기 위함 (선택사항)
    );
    console.log("eventSource", eventSource);
  } catch (error) {
    console.error("Error occurred while fetching notifications:", error);
    throw error;
  }
};
