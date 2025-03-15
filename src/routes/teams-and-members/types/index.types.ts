export type OrganizationMemberType = {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  activeOrg: string;
  organizations: {
    orgId: string;
    role: string;
    _id: string;
  }[];
};
