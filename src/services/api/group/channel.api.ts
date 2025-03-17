import {
  AddGroupMember,
  CreateGroupType,
  GroupSendMessageType,
} from "../../../routes/channels/types/Channel.types";
import { axiosInstance } from "../axios/axiosConfig";

//group apis

export const getGroups = async () => {
  const response = await axiosInstance.get("/group/get-groups");
  return response.data.groups;
};

export const createGroup = async (newGroup: CreateGroupType) => {
  const response = await axiosInstance.post("/group/create-group", newGroup);
  return response.data;
};

//group member apis

export const getGroupMembers = async (groupId: string) => {
  const response = await axiosInstance.get(`/group-members/${groupId}/members`);
  return response.data.members;
};

export const addGroupMember = async (body: AddGroupMember) => {
  const response = await axiosInstance.post("/group-members/add", body);
  return response.data;
};

//group messages apis

export const fetchGroupMessages = async (groupId: string) => {
  const response = await axiosInstance.get(
    `/group-messages/${groupId}/group-messages`
  );
  return response.data.messages.reverse();
};

export const sendGroupMessage = async (sendBody: GroupSendMessageType) => {
  const response = await axiosInstance.post(
    "/group-messages/send-message",
    sendBody
  );
  return response.data;
};
