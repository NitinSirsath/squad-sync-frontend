import { create } from "zustand";

export type OrganizationType = {
  orgId: {
    _id: string;
    name: string;
    industry: string;
  };
  role: string;
  _id: string;
};

type OrganizationStore = {
  organizations: OrganizationType[];
  setOrganizations: (orgs: OrganizationType[]) => void;
  addOrganization: (org: OrganizationType) => void;
};

export const useOrganizationStore = create<OrganizationStore>((set) => ({
  organizations: [],
  setOrganizations: (orgs) => set({ organizations: orgs }),
  addOrganization: (org) =>
    set((state) => ({ organizations: [...state.organizations, org] })),
}));
