"use client";
// utils/withAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "./useAuth";

export const withAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/");
      }
    }, [isLoggedIn, router]);

    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };
};
