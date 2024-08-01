"use client";
import Cookies from "js-cookie";
import useToken from "@/utils/useToken";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getAllApplicants } from "@/mainData/users/handleRequests";
// import { getAllCompanies } from "@/mainData/company/handleRequests";
// import { getAllJops } from "@/mainData/jops/handleRequests";
// import { getAllLanguages } from "@/mainData/languages/handleRequests";
// import { getAllSkills } from "@/mainData/skills/handleRequests";
import { getCompaniesByName } from "@/mainData/company/handleRequests";
import { getSkillsByName } from "@/mainData/skills/handleRequests";
import { getLanguagesByName } from "@/mainData/languages/handleRequests";

export default function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const { token, saveToken } = useToken();

  // const { currentPage: usersCurrentPage } = useSelector((state) => state.users);
  // const { currentPage: companiesCurrentPage } = useSelector(
  //   (state) => state.companies
  // );
  // const { currentPage: jopsCurrentPage } = useSelector(
  //   (state) => state.companies
  // );

  // const { currentPage: languagesjopsCurrentPage } = useSelector(
  //   (state) => state.languages
  // );

  // const { currentPage: skillsCurrentPage } = useSelector(
  //   (state) => state.skills
  // );

  if (Cookies.get("authToken")) {
    saveToken(Cookies.get("authToken"));
  }

  useEffect(() => {
    // dispatch(getAllApplicants({ currentPage: usersCurrentPage, token }));
    // dispatch(getAllCompanies({ currentPage: companiesCurrentPage, token }));
    // dispatch(getAllJops({ currentPage: jopsCurrentPage, token }));
    // dispatch(getAllLanguages({ currentPage: languagesjopsCurrentPage, token }));
    // dispatch(getAllSkills({ currentPage: skillsCurrentPage, token }));
    // dispatch(getCompaniesByName({ token }));
    // dispatch(getSkillsByName({ token }));
    // dispatch(getLanguagesByName({ token }));
  }, []);

  return <>{children}</>;
}
