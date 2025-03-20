import BugReportForm from "./components/BugReportForm";
import BugTable from "./components/BugTable";

const BugReportsPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Bug Reports
      </h2>
      <BugReportForm />
      <BugTable />
    </div>
  );
};

export default BugReportsPage;
