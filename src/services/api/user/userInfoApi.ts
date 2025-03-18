import { UserObjectType } from "@/types/user.types";
import { axiosInstance } from "../axios/axiosConfig";

export const getUserInfo = async () => {
  const response = await axiosInstance.get("/user/user-info");
  return response.data;
};

export const getUserProfileById = async (
  userId: string
): Promise<UserObjectType> => {
  const response = await axiosInstance.get(
    `/user/${userId}/getUserByProfileId`
  );
  return response.data.user;
};
