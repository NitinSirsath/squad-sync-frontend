import {
  createBug,
  getBugs,
  updateBug,
} from "@/services/api/bug-report/bug-report.api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Fetch all bug reports
export const useBugs = () => {
  return useQuery({
    queryKey: ["get-all-bugs"],
    queryFn: getBugs,
  });
};

// Create a new bug report
export const useCreateBug = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBug,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-bugs"] }); // Refresh bug list
    },
  });
};

// Update bug report status
export const useUpdateBug = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ bugId, status }: { bugId: string; status: string }) =>
      updateBug(bugId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-bugs"] }); // Refresh bug listRefresh bug list
    },
  });
};
