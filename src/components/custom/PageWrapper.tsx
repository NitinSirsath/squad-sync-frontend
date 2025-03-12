import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  headerHeight?: number; // Default header height
}

const PageWrapper = ({ children, headerHeight = 70 }: PageWrapperProps) => {
  return (
    <div
      className="flex w-full"
      style={{ height: `calc(100vh - ${headerHeight}px)` }} // ✅ Adjusts dynamically
    >
      {children}
    </div>
  );
};

export default PageWrapper;
