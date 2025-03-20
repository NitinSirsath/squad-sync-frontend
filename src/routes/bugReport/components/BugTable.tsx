import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import useBugTable from "../hooks/useBugTable";
import SelectFilters from "./SelectFilters";
import BugUpdatePopover from "./BugUpdatePopover"; // ✅ Import Popover Component
import { BugReport } from "../types/bugReport.types";

const BugTable = () => {
  const {
    isLoading,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    severityFilter,
    setSeverityFilter,
    statusFilter,
    setStatusFilter,
    reportedByFilter,
    setReportedByFilter,
    filteredBugs,
  } = useBugTable();

  if (isLoading) return <p>Loading bugs...</p>;

  return (
    <div className="p-6 rounded-2xl shadow-lg max-h-[90vh] flex flex-col">
      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex-1 flex items-center">
          <Input
            placeholder="Search bugs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <SelectFilters
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          reportedByFilter={reportedByFilter}
          setReportedByFilter={setReportedByFilter}
          bugs={filteredBugs}
        />
      </div>

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
                    <BugUpdatePopover bug={bug} />{" "}
                    {/* ✅ Use Popover instead of Modal */}
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
    </div>
  );
};

export default BugTable;
