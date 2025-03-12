import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-800 transition-all">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
