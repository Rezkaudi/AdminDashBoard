"use client";

// import Cookies from "js-cookie";
import useAuth from "./useAuth";

export const stateus = () => {
    const { isLoggedIn } = useAuth();
//   const isLoggedIn = Cookies.get("authToken");
  return !!isLoggedIn;
};
