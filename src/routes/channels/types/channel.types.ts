export type CreateGroupType = {
  name: string;
  description: string;
  isPrivate: boolean;
};

export type AddGroupMember = {
  userId: string;
  groupId: string;
};

export type GroupType = {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  orgId: string;
  membersCount: number;
  isPrivate: boolean;
  groupIcon: string;
  category: string;
  createdAt: string; // or Date if you want to parse it
  updatedAt: string; // or Date if you want to parse it
  __v: number;
};

export type GroupSendMessageType = {
  groupId: string;
  message: string;
  messageType: string;
};
