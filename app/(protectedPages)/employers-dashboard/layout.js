"use client";
import Cookies from "js-cookie";
import useToken from "@/utils/useToken";

export default function DashboardLayout({ children }) {
  const { saveToken } = useToken();
  if (Cookies.get("authToken")) {
    saveToken(Cookies.get("authToken"));
  }

  return <>{children}</>;
}
