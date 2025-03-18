import { useMemo } from "react";
import { User, FileText, TrendingUp, Settings, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchPopover = () => {
  const [open, setOpen] = useState(false);
  const searchInputRef = useRef(null);
  const recommendations = useMemo(() => {
    return [
      {
        id: 1,
        title: "User Management",
        description: "Manage user accounts and permissions.",
        icon: <User className="text-blue-500" />,
      },
      {
        id: 2,
        title: "Document Library",
        description: "Access shared company documents.",
        icon: <FileText className="text-green-500" />,
      },
      {
        id: 3,
        title: "Performance Metrics",
        description: "View key performance indicators.",
        icon: <TrendingUp className="text-purple-500" />,
      },
      {
        id: 4,
        title: "Settings",
        description: "Configure application settings.",
        icon: <Settings className="text-yellow-500" />,
      },
    ];
  }, []);
  return (
    <div ref={searchInputRef}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <Search className="size-5 text-gray-600 dark:text-gray-300" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="w-[400px] p-0 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <Card>
            <CardContent className="p-4">
              <Input
                type="text"
                placeholder="Search..."
                className="mb-4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
              />
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                Recommendations
              </h2>
              <ScrollArea className="h-[200px] pr-2">
                <div className="space-y-2">
                  {recommendations.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {result.icon}
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {result.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchPopover;
