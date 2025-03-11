import { axiosInstance } from "../axios/axiosConfig";

export const getUserInfo = async () => {
  const response = await axiosInstance.get("/user/user-info");
  return response.data;
};
