import { configureStore } from "@reduxjs/toolkit";

import jobSlice from "../features/job/jobSlice";
import toggleSlice from "../features/toggle/toggleSlice";
import filterSlice from "../features/filter/filterSlice";
import employerSlice from "../features/employer/employerSlice";
import employerFilterSlice from "../features/filter/employerFilterSlice";
import candidateSlice from "../features/candidate/candidateSlice";
import candidateFilterSlice from "../features/filter/candidateFilterSlice";
import shopSlice from "../features/shop/shopSlice";

//users
import usersSlice from "@/mainData/users/usersSlice";
// token
import tokenSlice from "@/mainData/token/tokenSlice";
// company
import companySlice from "@/mainData/company/companySlice";
// loginPupup
import loginPopupSlice from "@/mainData/loginPopup/loginPopupSlice";

import jopsSlice from "@/mainData/jops/jopsSlice";

import authSlice from "@/mainData/auth/authSlice";

import languagesSlice from "@/mainData/languages/languagesSlice";
import skillsSlice from "@/mainData/skills/skillsSlice";

export const store = configureStore({
  reducer: {
    job: jobSlice,
    toggle: toggleSlice,
    filter: filterSlice,
    employer: employerSlice,
    employerFilter: employerFilterSlice,
    candidate: candidateSlice,
    candidateFilter: candidateFilterSlice,
    shop: shopSlice,

    users: usersSlice,
    token: tokenSlice,
    companies: companySlice,
    loginPopup: loginPopupSlice,
    jops: jopsSlice,
    auth: authSlice,
    languages: languagesSlice,
    skills: skillsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
