import { useState, useMemo } from "react";
import { useBugs } from "../hooks/useBugReport.query";
import { BugReport } from "../types/bugReport.types";

const useBugTable = () => {
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

  return {
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
    bugs,
    filteredBugs,
    setSelectedBug,
    selectedBug,
  };
};

export default useBugTable;
