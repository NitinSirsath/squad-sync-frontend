import { axiosInstance } from "../axios/axiosConfig";

export const createBug = async (bugData: {
  title: string;
  category: string;
  severity: string;
  description: string;
}) => {
  const response = await axiosInstance.post(`/bug-report/create-bug`, bugData);
  return response.data;
};

export const getBugs = async () => {
  const response = await axiosInstance.get(`/bug-report`);
  return response.data;
};

export const updateBug = async (bugId: string, status: string) => {
  const response = await axiosInstance.post(`/bug-report/update-bug`, {
    bugId,
    status,
  });
  return response.data;
};
