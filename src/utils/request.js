import axios from "axios";
import router from "@/router";

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

const getAuthToken = () => localStorage.getItem("token");
const authInterceptor = config => {
  const token = getAuthToken();
  if (token) config.headers["token"] = token;
  return config;
};
request.interceptors.request.use(authInterceptor);

const errorInterceptor = error => {
  switch (error.response.status) {
    case 401: // authentication error, logout the user
      alert("Please login again");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
      break;
  }
  return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = response => {
  return response.data;
};

request.interceptors.response.use(responseInterceptor, errorInterceptor);

export default request;
