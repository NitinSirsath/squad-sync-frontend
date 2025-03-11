type Organization = {
  orgId: string;
  role: string;
  _id: string;
};

export type UserObjectType = {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  organizations: Organization[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  activeOrg: string;
};

export type UserRegisterFormType = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};
