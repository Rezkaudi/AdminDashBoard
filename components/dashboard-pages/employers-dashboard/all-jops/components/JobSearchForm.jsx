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
// title=&location=&skills=&companyId=
// currentPage, token, title, location, skills, companyId 

const JobSearchForm = () => {

    const dispatch = useDispatch()
    const { token } = useToken()
    const { currentPage } = useSelector((state) => state.jops)

    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [skills, setskills] = useState("")
    const [companyId, setCompanyId] = useState("")


    const handleSubmit = (e) => {

        e.preventDefault()

        setCurrentPage(1)

        dispatch(filterJops({ currentPage, token, title, location, skills, companyId })).unwrap().then(
            () => {
                console.log("get filter");
            },
            (error) => {
                console.error("Failed to :", error);
            }
        );

    }

    const handleReset = (e) => {
        e.preventDefault()

        setCurrentPage(1)
        setTitle("")
        setCompanyId("")
        setLocation("")
        setskills("")
        
        dispatch(getAllJops({ currentPage, token })).unwrap().then(
            () => {
                console.log("get filter");
            },
            (error) => {
                console.error("Failed to :", error);
            }
        );

    }

    return (
        <>
            <div className="job-search-form">
                <form className="row align-items-center" onSubmit={handleSubmit} onReset={handleReset}>
                    <div className="form-group col-lg-3 col-md-12 col-sm-12">
                        <SearchBox title={title} setTitle={setTitle} />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
                        <LocationBox location={location} setLocation={setLocation} />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
                        <Skills setskills={setskills} />
                    </div>

                    <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
                        <Categories setCompanyId={setCompanyId} />
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
