"use client"
import DashboardHeader from "@/components/header/DashboardHeader";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import MobileMenu from "@/components/header/MobileMenu";
import JobOverView from "@/components/job-single-pages/job-overview/JobOverView";
import JobSkills from "@/components/job-single-pages/shared-components/JobSkills";
import JobDetailsDescriptions from "@/components/job-single-pages/shared-components/JobDetailsDescriptions";
import Image from "next/image";
import JopApplicants from "@/components/job-single-pages/shared-components/JopApplicants";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToken from "@/utils/useToken";
import { getJop } from "@/mainData/jops/handleRequests";
import Link from "next/link";

const index = ({ id }) => {

  const dispatch = useDispatch()
  const { token } = useToken()
  const { findJop } = useSelector(state => state.jops)

  useEffect(() => {
    dispatch(getJop({ token, id }))
  }, [])

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      {findJop ?
        <section className="job-detail-section">
          <div className="job-detail-outer">
            <div className="auto-container">
              <div className="row">
                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                  <div className="job-block-outer">
                    <div className="job-block-seven">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <Image
                              width={100}
                              height={98}
                              src={"/images/resource/company-logo/1-1.png"}
                              alt="logo"
                            />
                          </span>
                          <h4>{findJop.title}</h4>

                          <ul className="job-info">
                            <li>
                              <span className="icon flaticon-briefcase"></span>
                              {findJop.Company?.name}
                            </li>
                            {/* compnay info */}

                            {/* <li>
                              <span className="icon flaticon-clock-3"></span>{" "}
                              {company?.time}
                            </li> */}
                            {/* time info */}
                            {findJop.salaryMin !== null && findJop.salaryMax !== null &&
                              <li>
                                <span className="icon flaticon-money"></span>{" "}
                                {findJop.salaryMin}-{findJop.salaryMax}
                              </li>
                            }
                            {/* salary info */}
                          </ul>
                          {/* End .job-info */}

                        </div>
                        {/* End .content */}
                      </div>
                    </div>
                    {/* <!-- Job Block --> */}
                  </div>
                  {/* End job-block-outer */}

                  <JobDetailsDescriptions description={findJop.description || "No Description"} />
                  <JopApplicants applicants={findJop.appliedUsers} />

                  {/* End jobdetails content */}

                  {/* <div className="other-options">
                    <div className="social-share">
                      <h5>Share this job</h5>
                      <SocialTwo />
                    </div>
                  </div> */}
                  {/* <!-- Other Options --> */}

                  {/* <div className="related-jobs">
                    <div className="title-box">
                      <h3>Related Jobs</h3>
                      <div className="text">
                        2020 jobs live - 293 added today.
                      </div>
                    </div>

                    <div className="row">
                      <RelatedJobs3 />
                    </div>
                  </div> */}
                  {/* <!-- Related Jobs --> */}
                </div>
                {/* End .content-column */}

                <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                  <aside className="sidebar">
                    {/* <div className="btn-box">
                      <a
                        href="#"
                        className="theme-btn btn-style-one"
                      >
                        Delete
                      </a>
                      <button className="bookmark-btn">
                        <i className="flaticon-bookmark"></i>
                      </button>
                    </div> */}
                    {/* End apply for job btn */}

                    <div className="sidebar-widget">
                      {/* <!-- Job Overview --> */}
                      <h4 className="widget-title">Job Overview</h4>
                      <JobOverView jop={findJop} />

                      <h4 className="widget-title mt-5 mb-2">Job Skills</h4>
                      <div className="widget-content">
                        <JobSkills data={findJop.skills} name="skills" />
                      </div>
                      <h4 className="widget-title mt-5 mb-2">Job Languages</h4>
                      <div className="widget-content">
                        <JobSkills data={findJop.languages} name="languages" />
                      </div>
                      {/* <!-- Job Skills --> */}
                    </div>
                    {/* End .sidebar-widget */}

                    <div className="sidebar-widget company-widget">
                      <div className="widget-content">
                        <div className="company-title">
                          <div className="company-logo">
                            <Image
                              width={54}
                              height={53}
                              src={"/images/resource/company-logo/1-1.png"}
                              alt="resource"
                            />
                          </div>
                          <h6 className="company-name">{findJop.Company?.email}</h6>
                          <Link href={`/company/${findJop.companyId}`} className="profile-link">
                            View company profile
                          </Link>
                        </div>
                        {/* End company title */}
                      </div>
                    </div>
                    {/* End .company-widget */}

                    {/* <div className="sidebar-widget contact-widget">
                      <h4 className="widget-title">Contact Us</h4>
                      <div className="widget-content">
                        <div className="default-form">
                          <Contact />
                        </div>
                      </div>
                    </div> */}
                    {/* End contact-widget */}
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
        <div className="d-flex my-5 py-5">
          <div className="spinner-border text-primary mx-auto" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      }
      {/* <!-- End Job Detail Section --> */}

      {/* {findJop && <FooterDefault footerStyle="alternate5" />} */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default index;
