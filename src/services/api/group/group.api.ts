import {
  AddGroupMember,
  CreateGroupType,
} from "@/routes/groups/types/group.types";
import { axiosInstance } from "../axios/axiosConfig";

export const getGroups = async () => {
  const response = await axiosInstance.get("/group/get-groups");
  return response.data.groups;
};

export const createGroup = async (newGroup: CreateGroupType) => {
  const response = await axiosInstance.post("/group/create-group", newGroup);
  return response.data;
};

export const getGroupMembers = async (groupId: string) => {
  const response = await axiosInstance.get(`/group-members/${groupId}/members`);
  return response.data.members;
};

export const addGroupMember = async (body: AddGroupMember) => {
  const response = await axiosInstance.post("/group-members/add", body);
  return response.data;
};
