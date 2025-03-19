import { useState } from "react";
import { useBugs } from "../hooks/useBugReport.query";
import { Button } from "@/components/ui/button";
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

const BugTable = () => {
  const { data: bugs, isLoading } = useBugs();
  const [selectedBug, setSelectedBug] = useState<null | BugReport>(null);

  if (isLoading) return <p>Loading bugs...</p>;

  return (
    <div className="p-6 dark:bg-gray-950 rounded-2xl">
      <Table>
        <TableCaption>A list of reported bugs.</TableCaption>
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
          {bugs?.map((bug: BugReport) => (
            <TableRow key={bug._id}>
              <TableCell className="font-medium">{bug.title}</TableCell>
              <TableCell>{bug.category}</TableCell>
              <TableCell>{bug.severity}</TableCell>
              <TableCell>{bug.reportedBy?.username || "Unknown"}</TableCell>
              <TableCell>{bug.status}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" onClick={() => setSelectedBug(bug)}>
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {bugs?.length > 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total Bugs</TableCell>
              <TableCell className="text-right">{bugs.length}</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>

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
