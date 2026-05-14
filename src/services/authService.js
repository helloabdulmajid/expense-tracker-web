import axiosInstance from "../api/axios";

export async function loginUser(loginData) {
  const response = await axiosInstance.post("/auth/login", loginData,);
  return response.data;
}


