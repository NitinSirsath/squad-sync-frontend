import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserOrganizations,
  createOrganization,
  organizationSelction,
} from "@/services/api/organization/organizationApi";
import { useOrganizationStore } from "@/services/stores/organization/organizationStore";

// Fetch organizations hook
export const useUserOrganizations = () => {
  const { setOrganizations } = useOrganizationStore();

  return useQuery({
    queryKey: ["user-organizations"],
    queryFn: async () => {
      const data = await fetchUserOrganizations();
      setOrganizations(data); // Store in Zustand
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry twice if API fails
  });
};

// Create organization hook
export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  const { addOrganization } = useOrganizationStore();

  return useMutation({
    mutationFn: createOrganization,
    onSuccess: async (newOrg) => {
      addOrganization(newOrg); // Store in Zustand
      queryClient.invalidateQueries({ queryKey: ["user-organizations"] }); // ✅ Correct
    },
  });
};

export const useOrganizationSelection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: organizationSelction,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
  });
};
