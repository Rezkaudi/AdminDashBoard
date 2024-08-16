"use client"
import Categories from "./Categories";
import Skills from "./Skills";
import JobSelect from "./JobSelect";
import LocationBox from "./LocationBox";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { filterJops, getAllJops } from "@/mainData/jops/handleRequests";
import { setCurrentPage } from "@/mainData/jops/jopsSlice";
import useToken from "@/utils/useToken";
import { useState } from "react";
import { clearJopFilter } from "@/mainData/jops/jopsSlice";

const JobSearchForm = () => {

    const dispatch = useDispatch()
    const { token } = useToken()
    const { filterByCompanyId, filterByTitle, filterBySkillId } = useSelector((state) => state.jops)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setCurrentPage(1))
        dispatch(filterJops({ currentPage: 1, token, title: filterByTitle, skills: filterBySkillId?.value || "", companyId: filterByCompanyId?.value || "" }))
    }

    const handleReset = (e) => {
        e.preventDefault()
        dispatch(clearJopFilter())
        dispatch(filterJops({ currentPage: 1, token, title: "", skills: "", companyId: "" }))
    }

    return (
        <>
            <div className="job-search-form">
                <form className="row align-items-center" onSubmit={handleSubmit} onReset={handleReset}>
                    <div className="form-group col-lg-4 col-md-12 col-sm-12">
                        <SearchBox />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-4 col-md-12 col-sm-12 location">
                        <Skills />
                    </div>

                    <div className="form-group col-lg-4 col-md-12 col-sm-12 location">
                        <Categories />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-2 col-md-12 col-sm-12 text-right d-flex w-100 justify-content-around mt-3">
                        <button
                            type="submit"
                            className="theme-btn btn-style-one w-25"
                        >
                            Find Jobs
                        </button>

                        <button
                            type="reset"
                            className="theme-btn btn-style-one bg-danger w-25"
                        >
                            Clear
                        </button>
                    </div>
                    {/* <!-- Form Group --> */}
                </form>
            </div>

            {/* <JobSelect /> */}
        </>
    );
};

export default JobSearchForm;
