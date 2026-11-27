import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-6 md:px-10 ${className}`}>{children}</div>
  );
};
