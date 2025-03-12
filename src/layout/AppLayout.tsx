import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col ">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          <Outlet /> {/* ✅ Ensures children are rendered */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
