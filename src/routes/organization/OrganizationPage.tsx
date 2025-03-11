import { useState } from "react";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  useCreateOrganization,
  useUserOrganizations,
} from "./hooks/useOrganization.query";
import { OrganizationType } from "@/services/stores/organization/organizationStore";

const OrganizationPage = () => {
  // Fetch organizations
  const { data: organizations, isLoading } = useUserOrganizations();
  const createOrgMutation = useCreateOrganization();

  const [formData, setFormData] = useState({
    organizationName: "",
    industry: "",
  });

  const handleCreateOrganization = () => {
    createOrgMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ organizationName: "", industry: "" });
      },
    });
  };

  return (
    <div className="flex flex-col justify-between min-h-screen items-center px-4 sm:px-6">
      {/* Main Card Section */}
      <div className="w-full max-w-md p-6 sm:p-8 mt-5 bg-white dark:bg-gray-800 rounded-lg">
        {/* Header */}
        <CardHeader className="text-center">
          <h1 className="text-xl font-bold text-blue-900 dark:text-white tracking-tight">
            SQUAD SYNC
          </h1>
          <h1 className="text-2xl sm:text-2xl mt-2 sm:mt-3 font-semibold text-gray-800 dark:text-gray-200 leading-tight">
            Sign in to your workspace
          </h1>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-5 mt-5">
          {/* Organization List */}
          {isLoading ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Loading organizations...
            </p>
          ) : organizations && organizations.length > 0 ? (
            <div>
              <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">
                Existing Organizations
              </h2>
              <div className="space-y-3 mt-3">
                {organizations.map((org: OrganizationType) => (
                  <Button
                    key={org.orgId._id}
                    variant="outline"
                    className="w-[280px] sm:w-[350px] flex items-center justify-between py-2 sm:py-3"
                  >
                    <span>{org.orgId.name}</span>
                    <span className="text-xs text-gray-500">{org.role}</span>
                  </Button>
                ))}
              </div>
              <div className="relative flex items-center justify-center my-5">
                <Separator className="w-full my-7" />
                <span className="absolute bg-white dark:bg-gray-800 px-2 sm:px-3 text-xs sm:text-sm text-gray-500 font-medium">
                  OR
                </span>
              </div>
            </div>
          ) : null}

          {/* Create Organization Section */}
          <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">
            Create Organization
          </h2>
          <Input
            type="text"
            placeholder="Organization Name"
            value={formData.organizationName}
            onChange={(e) =>
              setFormData({ ...formData, organizationName: e.target.value })
            }
            className="w-[280px] sm:w-[350px] py-2 sm:py-3 text-sm sm:text-md"
          />
          <Input
            type="text"
            placeholder="Industry"
            value={formData.industry}
            onChange={(e) =>
              setFormData({ ...formData, industry: e.target.value })
            }
            className="w-[280px] sm:w-[350px] py-2 sm:py-3 text-sm sm:text-md"
          />
          <Button
            onClick={handleCreateOrganization}
            disabled={createOrgMutation.isPending}
            className="w-[280px] sm:w-[350px] py-2 sm:py-3 text-sm sm:text-md font-semibold tracking-wide"
          >
            {createOrgMutation.isPending
              ? "Creating..."
              : "Create Organization"}
          </Button>
        </CardContent>
      </div>

      {/* Footer Section */}
      <footer className="text-center w-full max-w-md py-4 mt-auto text-sm text-gray-500 dark:text-gray-400">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="/privacy" className="hover:underline">
            Privacy & Terms
          </a>
          <a href="/contact" className="hover:underline">
            Contact Us
          </a>
          <select className="bg-transparent border border-gray-400 text-gray-600 dark:text-gray-300 dark:border-gray-600 px-2 py-1 rounded">
            <option>English</option>
            <option>हिंदी</option>
            <option>Français</option>
            <option>Deutsch</option>
          </select>
        </div>
      </footer>
    </div>
  );
};

export default OrganizationPage;
