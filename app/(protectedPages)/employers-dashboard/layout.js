"use client";
import Cookies from "js-cookie";
import useToken from "@/utils/useToken";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllApplicants,getResentUsers } from "@/mainData/users/handleRequests";
import { getAllCompanies } from "@/mainData/company/handleRequests";

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const { token, saveToken } = useToken();

  const { currentPage: usersCurrentPage } = useSelector(
    (state) => state.users
  );
  const { currentPage: companiesCurrentPage } = useSelector(
    (state) => state.companies
  );

  if (Cookies.get("authToken")) {
    saveToken(Cookies.get("authToken"));
  }

  useEffect(() => {
    dispatch(getAllApplicants({ currentPage: usersCurrentPage, token }));
    dispatch(getAllCompanies({ currentPage: companiesCurrentPage, token }));
    dispatch(getResentUsers({token}))
  }, []);

  return <>{children}</>;
}
