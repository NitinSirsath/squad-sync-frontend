import PageWrapper from "@/components/custom/PageWrapper";
import HomeSidebar from "./components/HomeSidebar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <PageWrapper>
      <HomeSidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </PageWrapper>
  );
};

export default HomePage;
