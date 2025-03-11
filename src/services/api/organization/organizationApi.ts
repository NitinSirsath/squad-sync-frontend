import { axiosInstance } from "../axios/axiosConfig";

// Fetch user organizations
export const fetchUserOrganizations = async () => {
  const response = await axiosInstance.get("/organization/user-organizations");
  return response.data.organizations; // Extract organizations array
};

// Create an organization
export const createOrganization = async (orgData: {
  organizationName: string;
  industry: string;
}) => {
  const response = await axiosInstance.post("/organization/create", orgData);
  return response.data;
};
