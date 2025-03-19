import BugReportForm from "./components/BugReportForm";
import BugTable from "./components/BugTable";

const BugReportsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Bug Reports</h1>
      <BugReportForm />
      <BugTable />
    </div>
  );
};

export default BugReportsPage;
