import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BugReport } from "../types/bugReport.types";
import { Dispatch, SetStateAction } from "react";

interface SelectFiltersProps {
  categoryFilter: string;
  setCategoryFilter: Dispatch<SetStateAction<string>>;
  severityFilter: string;
  setSeverityFilter: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
  reportedByFilter: string;
  setReportedByFilter: Dispatch<SetStateAction<string>>;
  bugs: BugReport[] | undefined; // Allow undefined to prevent errors during initial loading
}

const SelectFilters = ({
  categoryFilter,
  setCategoryFilter,
  severityFilter,
  setStatusFilter,
  statusFilter,
  reportedByFilter,
  setReportedByFilter,
  bugs,
  setSeverityFilter,
}: SelectFiltersProps) => {
  return (
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
        </SelectContent>
      </Select>

      <Select value={reportedByFilter} onValueChange={setReportedByFilter}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Reported By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="all" value="all">
            All
          </SelectItem>
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
  );
};

export default SelectFilters;
