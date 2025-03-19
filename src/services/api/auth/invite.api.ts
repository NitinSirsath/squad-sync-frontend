import { axiosInstance } from "../axios/axiosConfig";

export interface InviteUserType {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export const inviteUser = async (body: InviteUserType) => {
  const response = await axiosInstance.post("/invite/addNewUser", body);
  return response.data;
};

export const getInvitedUsers = async () => {
  const response = await axiosInstance.get("/invite/invitedUsers");
  return response.data;
};
