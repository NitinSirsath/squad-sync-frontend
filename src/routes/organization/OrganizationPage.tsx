import { useState } from "react";
import { CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const OrganizationPage = () => {
  // Sample organization data (Replace with API data)
  const organizations = [
    {
      orgId: {
        _id: "67cec69b690e37bb425d9e2a",
        name: "Jarves INC",
        industry: "SMR",
      },
      role: "admin",
      _id: "67cec69c690e37bb425d9e2d",
    },
    {
      orgId: {
        _id: "67cec69b690e37bb425d9e2b",
        name: "TechSync",
        industry: "Software",
      },
      role: "member",
      _id: "67cec69c690e37bb425d9e2e",
    },
  ];

  const [formData, setFormData] = useState({
    organizationName: "",
    industry: "",
  });

  const handleCreateOrganization = () => {
    console.log("Creating Organization:", formData);
    // Add API call here
  };

  return (
    <div className="flex items-center justify-center  px-4 sm:px-6">
      <div className="w-full max-w-md p-6 sm:p-8 mt-5 bg-white dark:bg-gray-800 rounded-lg ">
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
          {organizations.length > 0 && (
            <div>
              <h2 className="text-lg text-center font-semibold text-gray-700 dark:text-gray-300">
                Existing Organizations
              </h2>
              <div className="space-y-3 mt-3">
                {organizations.map((org) => (
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
          )}

          {/* OR Separator */}

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
            className="w-[280px] sm:w-[350px] py-2 sm:py-3 text-sm sm:text-md font-semibold tracking-wide"
          >
            Create Organization
          </Button>
        </CardContent>
      </div>
    </div>
  );
};

export default OrganizationPage;
