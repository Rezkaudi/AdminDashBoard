"use client";
import Cookies from "js-cookie";
import useToken from "@/utils/useToken";

const Wrapper = ({ children }) => {
  const {saveToken } = useToken();

  if (Cookies.get("authToken")) {
    saveToken(Cookies.get("authToken"))
  }
  return <>{children}</>;
};

export default Wrapper;
