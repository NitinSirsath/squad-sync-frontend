import { useState } from "react";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  useCreateOrganization,
  useOrganizationSelection,
  useUserOrganizations,
} from "./hooks/useOrganization.query";
import { OrganizationType } from "@/services/stores/organization/organizationStore";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "@/hooks/auth/useAuth";
import ThemeWrapper from "@/components/ThemeWrapper";

const OrganizationPage = () => {
  const navigate = useNavigate();
  // Fetch organizations
  const { data: organizations, isLoading } = useUserOrganizations();
  const createOrgMutation = useCreateOrganization();
  const { isPending: loadingSelection, mutate: mutateSelection } =
    useOrganizationSelection();
  const { refetch: refetchUserInfo } = useUserInfo();

  const [formData, setFormData] = useState({
    organizationName: "",
    industry: "",
  });

  const handleCreateOrganization = () => {
    createOrgMutation.mutate(formData, {
      onSuccess: async (response) => {
        setFormData({ organizationName: "", industry: "" });
        handleSelection(response.organization._id);
        await refetchUserInfo();
        navigate("/");
      },
    });
  };

  const handleSelection = (org: string) => {
    mutateSelection(org, {
      onSuccess: async () => {
        await refetchUserInfo();
        navigate("/");
      },
    });
  };

  return (
    <ThemeWrapper>
      <div className="flex flex-col justify-between min-h-screen items-center px-4 sm:px-6">
        {/* Main Card Section */}
        <div
          className="w-full max-w-md p-6 sm:p-8 mt-5 rounded-lg"
          //   style={{ backgroundColor: "var(--card-bg)" }}
        >
          {/* Header */}
          <CardHeader className="text-center">
            <h1
              className="text-xl font-bold tracking-tight"
              style={{ color: "var(--primary)" }}
            >
              SQUAD SYNC
            </h1>
            <h1
              className="text-2xl sm:text-2xl mt-2 sm:mt-3 font-semibold leading-tight"
              style={{ color: "var(--foreground)" }}
            >
              Sign in to your workspace
            </h1>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-5 mt-5">
            {/* Organization List */}
            {isLoading ? (
              <p className="text-center" style={{ color: "var(--text-muted)" }}>
                Loading organizations...
              </p>
            ) : organizations && organizations.length > 0 ? (
              <div>
                <h2
                  className="text-lg text-center font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  Existing Organizations
                </h2>
                <div className="space-y-3 mt-3">
                  {organizations.map((org: OrganizationType) => (
                    <Button
                      onClick={() => handleSelection(org.orgId._id)}
                      key={org.orgId._id}
                      disabled={loadingSelection}
                      variant="outline"
                      className="w-[280px] sm:w-[350px] flex items-center justify-between py-2 sm:py-3"
                    >
                      <span>
                        {loadingSelection ? "Selecting..." : org.orgId.name}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {org.role}
                      </span>
                    </Button>
                  ))}
                </div>
                <div className="relative flex items-center justify-center my-5">
                  <Separator className="w-full my-7" />
                  <span
                    className="absolute px-2 sm:px-3 text-xs sm:text-sm font-medium"
                    style={{
                      backgroundColor: "var(--card-bg)",
                      color: "var(--text-muted)",
                    }}
                  >
                    OR
                  </span>
                </div>
              </div>
            ) : null}

            {/* Create Organization Section */}
            <h2
              className="text-lg text-center font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              Create Organization
            </h2>
            <Input
              type="text"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={(e) =>
                setFormData({ ...formData, organizationName: e.target.value })
              }
              style={{
                backgroundColor: "var(--input-bg)",
                color: "var(--input-fg)",
              }}
            />
            <Input
              type="text"
              placeholder="Industry"
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              style={{
                backgroundColor: "var(--input-bg)",
                color: "var(--input-fg)",
              }}
            />
            <Button
              className="w-full"
              onClick={handleCreateOrganization}
              disabled={createOrgMutation.isPending}
            >
              {createOrgMutation.isPending
                ? "Creating..."
                : "Create Organization"}
            </Button>
          </CardContent>
        </div>
      </div>
    </ThemeWrapper>
  );
};

export default OrganizationPage;
