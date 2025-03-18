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

interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
}

interface Member {
  _id: string;
  userId: User;
  role: "admin" | "member";
  joinedAt: string; // ISO 8601 date-time string
}

export type GroupMembersType = Member;

export interface GroupInfoType {
  _id: string;
  name: string;
  description: string;
  createdBy: {
    _id: string;
    email: string;
  };
  orgId: {
    _id: string;
    name: string;
  };
  membersCount: number;
  isPrivate: boolean;
  groupIcon: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type updateChanneBodyType = {
  groupId: string;
  name: string | undefined;
  description: string | undefined;
};
