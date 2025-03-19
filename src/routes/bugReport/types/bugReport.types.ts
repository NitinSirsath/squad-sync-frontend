interface ReportedBy {
  _id: string;
  username: string;
  email: string;
}

export type BugStatus =
  | "open"
  | "in-progress"
  | "fixed"
  | "closed"
  | "resolved";

interface Organization {
  _id: string;
  name: string;
}

export interface BugReport {
  _id: string;
  title: string;
  category: string;
  severity: string;
  description: string;
  reportedBy: ReportedBy;
  organization: Organization;
  status: BugStatus;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  __v: number;
}

export type BugReportArray = BugReport; // Type for an array of BugReport objects
