"use client"
import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";

import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToken from "@/utils/useToken";
import { getCompany } from "@/mainData/company/handleRequests";

const index = ({ id }) => {

    const dispatch = useDispatch()
    const { token } = useToken()
    const { findCompany } = useSelector(state => state.companies)


    const company = findCompany;

    useEffect(() => {
        dispatch(getCompany({ token, id }))
    }, [])

    return (

        <>
            {/* <!-- Header Span --> */}
            <span className="header-span"></span>

            <DashboardHeader />
            {/* <!--End Main Header --> */}

            <MobileMenu />
            {/* End MobileMenu */}
            {/* <!-- Job Detail Section --> */}
            {company ?
                <section className="job-detail-section">
                    {/* <!-- Upper Box --> */}
                    <div className="upper-box">
                        <div className="auto-container">
                            <div className="job-block-seven">
                                <div className="inner-box">
                                    <div className="content">
                                        <span className="company-logo">
                                            <Image
                                                width={100}
                                                height={100}
                                                className="rounded-full"
                                                src={'/images/resource/candidate-1.png'}
                                                alt="logo"
                                            />
                                        </span>
                                        <h4>{company.name}</h4>

                                        <ul className="job-info">
                                            {!!company.address && <li>
                                                <span className="icon flaticon-map-locator"></span>
                                                {company.address}
                                            </li>}

                                            <li>
                                                <span className="icon flaticon-mail"></span>
                                                {company.email}
                                            </li>
                                        </ul>

                                    </div>

                                </div>
                            </div>
                            {/* <!-- Job Block --> */}
                        </div>
                    </div>
                    {/* <!-- Upper Box --> */}

                    {/* <!-- job-detail-outer--> */}
                    <div className="job-detail-outer">
                        <div className="auto-container">
                            <div className="row">
                                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                                    {/*  job-detail */}
                                    {/* <JobDetailsDescriptions company={company} /> */}
                                    {/* End job-detail */}

                                    {/* <!-- Related Jobs --> */}

                                </div>
                                {/* End .content-column */}

                                <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                                    <aside className="sidebar">
                                        <div className="sidebar-widget company-widget">
                                            <div className="widget-content">
                                                {/*  compnay-info */}
                                                <ul className="company-info mt-0">
                                                    <li>
                                                        Email: <span>{company.email}</span>
                                                    </li>
                                                    <li>
                                                        Location: <span>{company.address || "no value"}</span>
                                                    </li>
                                                    {/* <li>
                                                        Social media:
                                                        <Social />
                                                    </li> */}
                                                </ul>
                                                {/* End compnay-info */}

                                                {/* <div className="btn-box">
                                                    <a
                                                        href="#"
                                                        className="theme-btn btn-style-three"
                                                        style={{ textTransform: "lowercase" }}
                                                    >
                                                        www.{employer?.name}.com
                                                    </a>
                                                </div> */}
                                                {/* btn-box */}
                                            </div>
                                        </div>
                                        {/* End company-widget */}

                                        {/* <div className="sidebar-widget">
                                            <h4 className="widget-title">Job Location</h4>
                                            <div className="widget-content">
                                                <div style={{ height: "100px", width: "100%" }}>
                                                    <MapJobFinder />
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* End sidebar-widget */}
                                    </aside>
                                    {/* End .sidebar */}
                                </div>
                                {/* End .sidebar-column */}
                            </div>
                        </div>
                    </div>
                    {/* <!-- job-detail-outer--> */}
                </section>
                :
                <div className=" d-flex my-5 mh-100">
                    <div className="spinner-border text-primary mx-auto" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

            }
            {/* <!-- End Job Detail Section --> */}

            {/* {company ? <FooterDefault footerStyle="alternate5" /> : ""} */}
            {/* <!-- End Main Footer --> */}
        </>
    );
};

export default index;
