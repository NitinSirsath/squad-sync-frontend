import { axiosInstance } from "../axios/axiosConfig";

export interface CreateUserType {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const createUser = async (body: CreateUserType) => {
  const response = await axiosInstance.post("/user/create-user", body);
  return response.data;
};
