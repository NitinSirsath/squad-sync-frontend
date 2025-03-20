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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BugUpdateModal from "./BugUpdateModal";
import { BugReport } from "../types/bugReport.types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const BugTable = () => {
  const { data: bugs, isLoading } = useBugs();
  const [selectedBug, setSelectedBug] = useState<null | BugReport>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [reportedByFilter, setReportedByFilter] = useState<string>("all");

  // Extract unique reporters for the filter dropdown

  // Filtered bug list
  const filteredBugs = useMemo(() => {
    return bugs?.filter((bug: BugReport) => {
      return (
        (categoryFilter === "all" || bug.category === categoryFilter) &&
        (severityFilter === "all" || bug.severity === severityFilter) &&
        (statusFilter === "all" || bug.status === statusFilter) &&
        (reportedByFilter === "all" ||
          bug.reportedBy?.username === reportedByFilter) &&
        (searchQuery === "" ||
          bug.title.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [
    bugs,
    searchQuery,
    categoryFilter,
    severityFilter,
    statusFilter,
    reportedByFilter,
  ]);

  if (isLoading) return <p>Loading bugs...</p>;

  return (
    <div className="p-6 rounded-2xl shadow-lg  max-h-[90vh] flex flex-col">
      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Search Bar */}
        <div className="flex-1 flex items-center">
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

          {/* Reported By Filter */}
          <Select value={reportedByFilter} onValueChange={setReportedByFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Reported By" />
            </SelectTrigger>
            <SelectContent>
              {/* Always include "All" option */}
              <SelectItem key="all" value="all">
                All
              </SelectItem>

              {/* Extract unique reporters, ensuring they are strings */}
              {Array.from(
                new Set<string>(
                  bugs?.map(
                    (bug: BugReport) => bug.reportedBy?.username || "Unknown"
                  ) ?? []
                )
              ).map((reporter) => (
                <SelectItem key={reporter} value={reporter}>
                  {reporter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bug Table with Scrolling */}
      <ScrollArea className="flex-1 overflow-y-auto">
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
                          ? "secondary"
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
