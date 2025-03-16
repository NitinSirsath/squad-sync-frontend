export type CreateGroupType = {
  name: string;
  description: string;
  isPrivate: boolean;
};

export type AddGroupMember = {
  userId: string;
  groupId: string;
};
