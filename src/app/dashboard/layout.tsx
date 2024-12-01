"use client";
import LoginComponent from "@/components/atoms/login.component";
import { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);
  if (!isUserConnected)
    return <LoginComponent setIsUserConnected={setIsUserConnected} />;
  return <>{children}</>;
};

export default DashboardLayout;
