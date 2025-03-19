import { useState, useMemo } from "react";
import { useBugs } from "../hooks/useBugReport.query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BugUpdateModal from "./BugUpdateModal";
import { BugReport } from "../types/bugReport.types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

const BugTable = () => {
  const { data: bugs, isLoading } = useBugs();
  const [selectedBug, setSelectedBug] = useState<null | BugReport>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Ensure useMemo is called at the top level (Fix 1)
  const filteredBugs = useMemo(() => {
    return bugs?.filter((bug: BugReport) => {
      return (
        (categoryFilter === "all" || bug.category === categoryFilter) &&
        (severityFilter === "all" || bug.severity === severityFilter) &&
        (statusFilter === "all" || bug.status === statusFilter) &&
        (searchQuery === "" ||
          bug.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [bugs, searchQuery, categoryFilter, severityFilter, statusFilter]);

  if (isLoading) return <p>Loading bugs...</p>;

  return (
    <div className="p-6 rounded-2xl shadow-lg dark:bg-gray-950">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Search Bar */}
        <div className="flex-1 flex items-center">
          <Search className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search bugs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4 w-full md:w-auto">
          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="ui">UI</SelectItem>
              <SelectItem value="ux">UX</SelectItem>
              <SelectItem value="functionality">Functionality</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* Severity Filter */}
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="fixed">Fixed</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bug Table */}
      <ScrollArea className="max-h-[600px]">
        <Table>
          <TableCaption>A list of reported bugs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Reported By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBugs?.length > 0 ? (
              filteredBugs.map((bug: BugReport) => (
                <TableRow key={bug._id}>
                  <TableCell className="font-medium">{bug.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{bug.category}</Badge>
                  </TableCell>
                  <TableCell className="capitalize">{bug.severity}</TableCell>
                  <TableCell>{bug.reportedBy?.username || "Unknown"}</TableCell>
                  <TableCell className="capitalize">
                    <Badge
                      variant={
                        bug.status === "open"
                          ? "destructive"
                          : bug.status === "resolved"
                          ? "secondary" // Fix 2: Changed from "success" to "secondary"
                          : "outline"
                      }
                    >
                      {bug.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedBug(bug)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No bugs match the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {filteredBugs?.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total Bugs</TableCell>
                <TableCell className="text-right">
                  {filteredBugs.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </ScrollArea>

      {selectedBug && (
        <BugUpdateModal
          bug={selectedBug}
          onClose={() => setSelectedBug(null)}
        />
      )}
    </div>
  );
};

export default BugTable;
