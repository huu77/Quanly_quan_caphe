import axios from "axios";

const API_URL = import.meta.env.VITE_APP_ROOM_URL;
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Bộ lọc yêu cầu để thêm token vào header
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Bộ lọc phản hồi để xử lý làm mới token
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra lỗi có phải là 401 Unauthorized và nếu đây không phải là lần thử lại
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken"); // Đảm bảo bạn có token làm mới riêng
      try {
        if (refreshToken) {
          const response = await axios.post(
            `http://localhost:3333/api/v1/refreshtoken`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                accept: "*/*",
              },
            }
          );

          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return axiosInstance(originalRequest);
        } else {
          // Xử lý trường hợp không có refreshToken
          console.error("Không tìm thấy refresh token.");
          window.location.href = "/login";
        }
      } catch (refreshError) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
