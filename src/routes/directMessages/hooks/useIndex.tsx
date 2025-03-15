import { useOrgMembers } from "@/routes/organization/hooks/useOrganization.query";

const useDirectMessagePage = () => {
  const { data: orgMembersData, isLoading: isOrgMembersLoading } =
    useOrgMembers();

  return { orgMembersData, isOrgMembersLoading };
};

export default useDirectMessagePage;
