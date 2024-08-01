"use client"
import candidates from "@/data/candidates";
import candidateResume from "@/data/candidateResume";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import FooterDefault from "@/components/footer/common-footer";
import DefaulHeader from "@/components/header/DefaulHeader";
import MobileMenu from "@/components/header/MobileMenu";
import Contact from "@/components/candidates-single-pages/shared-components/Contact";
import GalleryBox from "@/components/candidates-single-pages/shared-components/GalleryBox";
import Social from "@/components/candidates-single-pages/social/Social";
import JobSkills from "@/components/candidates-single-pages/shared-components/JobSkills";
import Cvs from "@/components/candidates-single-pages/shared-components/cvs";
// import AboutVideo from "@/components/candidates-single-pages/shared-components/AboutVideo";
import Image from "next/image";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToken from "@/utils/useToken";
import { getAllApplicantInfo, getUser } from "@/mainData/users/handleRequests";

const index = ({ id }) => {

    const dispatch = useDispatch()
    const { token } = useToken()
    const { fullUserInfo, findUser } = useSelector(state => state.users)

    const candidate = candidates[0];
    const applicant = fullUserInfo;

    useEffect(() => {
        dispatch(getAllApplicantInfo({ token, id }))
        dispatch(getUser({ token, id }))
    }, [])

    return (

        <>
            {/* <!-- Header Span --> */}
            <span className="header-span"></span>

            {/* End Login Popup Modal */}

            <DashboardHeader />
            {/* <!--End Main Header --> */}

            <MobileMenu />
            {/* End MobileMenu */}

            {/* <!-- Job Detail Section --> */}
            {applicant && findUser ?
                <section className="candidate-detail-section">
                    <div className="upper-box">
                        <div className="auto-container">
                            <div className="candidate-block-five">
                                <div className="inner-box">
                                    <div className="content">
                                        <figure className="image">
                                            <Image
                                                width={100}
                                                height={100}
                                                src={candidate?.avatar}
                                                alt="avatar"
                                            />
                                        </figure>
                                        <h4 className="name">{findUser.firstName || "No value"} {findUser.lastName || "No value"}</h4>

                                        <ul className="candidate-info">
                                            <li className="designation">
                                                {!!applicant.basicInfo?.brief ? applicant.basicInfo.brief : "No value"}
                                            </li>
                                            <li>
                                                <span className="icon flaticon-map-locator"></span>
                                                {applicant.basicInfo?.location || "No value"}
                                            </li>
                                            <li>
                                                <span className="icon flaticon-money"></span> $
                                                {applicant.basicInfo?.desiredSalary || "No value"}
                                            </li>
                                            <li>
                                                <span className="icon flaticon-clock"></span>
                                                {`Member Since ${applicant.basicInfo?.createdAt}` || "No value"}
                                            </li>
                                        </ul>

                                        {/* <ul className="post-tags">
                                            {candidate?.tags?.map((val, i) => (
                                                <li key={i}>{val}</li>
                                            ))}
                                        </ul> */}
                                    </div>

                                    <div className="btn-box">
                                        <a
                                            className="theme-btn btn-style-one"
                                            href="#"
                                            download
                                        >
                                            Download CV
                                        </a>
                                        <button className="bookmark-btn">
                                            <i className="flaticon-bookmark"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/*  <!-- Candidate block Five --> */}
                        </div>
                    </div>
                    {/* <!-- Upper Box --> */}

                    <div className="candidate-detail-outer">
                        <div className="auto-container">
                            <div className="row">
                                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                                    <div className="job-detail">
                                        {/* {candidateResume.map((resume) => (
                                
                                        ))} */}


                                        {/*education  */}
                                        <div
                                            className={`resume-outer theme-blue`}
                                        >
                                            <div className="upper-title">
                                                <h4>Education</h4>
                                            </div>

                                            {fullUserInfo.education.length > 0 ? fullUserInfo.education.map((item, index) => (
                                                <div className="resume-block" key={item.id}>
                                                    <div className="inner">
                                                        <span className="name">{String.fromCharCode(65 + index)}</span>
                                                        <div className="title-box">
                                                            <div className="info-box">
                                                                <h3>{item.degree}</h3>
                                                                <span>{item.institution}</span>
                                                            </div>
                                                            <div className="edit-box">
                                                                <span className="year">{item.fromYear} - {item.toYear}</span>
                                                            </div>
                                                        </div>
                                                        {/* <div className="text">{item.text}</div> */}
                                                    </div>
                                                </div>
                                            ))
                                                :
                                                <span className="text px-5">No Education yet</span>
                                            }

                                        </div>


                                        {/*Experience  */}
                                        <div
                                            className={`resume-outer theme-yellow`}
                                        >
                                            <div className="upper-title">
                                                <h4>Experience</h4>
                                            </div>

                                            {fullUserInfo.experiences.length > 0 ? fullUserInfo.experiences.map((item, index) => (
                                                <div className="resume-block" key={item.id}>
                                                    <div className="inner">
                                                        <span className="name">{String.fromCharCode(65 + index)}</span>
                                                        <div className="title-box">
                                                            <div className="info-box">
                                                                <h3>{item.title}</h3>
                                                                <span>{item.company}</span>
                                                            </div>
                                                            <div className="edit-box">
                                                                <span className="year">{item.startYear} - {item.endYear}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text">{item.summary} in  {item.location}</div>
                                                    </div>
                                                </div>
                                            ))
                                                :
                                                <span className="text px-5">No Experience yet</span>
                                            }

                                        </div>


                                        {/*Experience  */}
                                        <div
                                            className={`resume-outer`}
                                        >
                                            <div className="upper-title">
                                                <h4>Projects</h4>
                                            </div>

                                            {fullUserInfo.projects.length > 0 ? fullUserInfo.projects.map((item, index) => (
                                                <div className="resume-block" key={item.id}>
                                                    <div className="inner">
                                                        <span className="name">{String.fromCharCode(65 + index)}</span>
                                                        <div className="title-box">
                                                            <div className="info-box">
                                                                <h3>{item.title}</h3>
                                                                <span>{item.company}</span>
                                                            </div>
                                                            <div className="edit-box">
                                                                <span className="year">{item.startYear} - {item.endYear}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text">{item.summary} in  {item.location}</div>
                                                    </div>
                                                </div>
                                            )) :
                                                <span className="text px-5">No Projects yet</span>
                                            }

                                        </div>

                                        {/*certificates  */}
                                        <div
                                            className={`resume-outer theme-blue`}
                                        >
                                            <div className="upper-title">
                                                <h4>Certificates</h4>
                                            </div>

                                            {fullUserInfo.certificates.length > 0 ? fullUserInfo.certificates.map((item, index) => (
                                                <div className="resume-block" key={item.id}>
                                                    <div className="inner">
                                                        <span className="name">{String.fromCharCode(65 + index)}</span>
                                                        <div className="title-box">
                                                            <div className="info-box">
                                                                <a href={item.link}>
                                                                    <h3>{item.title}</h3>
                                                                </a>
                                                                <span>{item.institution}</span>
                                                            </div>
                                                            {/* <div className="edit-box">
                                                                <span className="year">{item.fromYear} - {item.toYear}</span>
                                                            </div> */}
                                                        </div>
                                                        <div className="text">{item.brief}</div>
                                                    </div>
                                                </div>
                                            ))
                                                :
                                                <span className="text px-5">No Certificates yet</span>
                                            }

                                        </div>
                                    </div>
                                </div>
                                {/* End .content-column */}

                                <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                                    <aside className="sidebar">
                                        <div className="sidebar-widget">
                                            <div className="widget-content">
                                                <ul className="job-overview">
                                                    {/* <li>
                                                        <i className="icon icon-calendar"></i>
                                                        <h5>Experience:</h5>
                                                        <span>0-2 Years</span>
                                                    </li> */}

                                                    <li>
                                                        <i className="icon icon-phone"></i>
                                                        <h5>Phone number:</h5>
                                                        <span>{findUser.phone || "No value"}</span>
                                                    </li>

                                                    <li>
                                                        <i className="icon icon-email"></i>
                                                        <h5>Email:</h5>
                                                        <span>{findUser.email || "No value"}</span>
                                                    </li>

                                                    <li>
                                                        <i className="icon icon-expiry"></i>
                                                        <h5>Birth Date:</h5>
                                                        <span>{fullUserInfo.basicInfo?.birthDate || "No value"}</span>
                                                    </li>

                                                    <li>
                                                        <i className="icon icon-rate"></i>
                                                        <h5>Desired Salary:</h5>
                                                        <span>{fullUserInfo.basicInfo?.desiredSalary ? fullUserInfo.basicInfo?.desiredSalary :
                                                            <span className="text px-3">No Salary</span>
                                                        }</span>
                                                    </li>

                                                    <li>
                                                        <i className="icon icon-language"></i>
                                                        <h5>Languages:</h5>
                                                        <span>{fullUserInfo.languages?.length > 0 ? fullUserInfo.languages.map(item =>
                                                            <>{item.languageName} , </>
                                                        ) :
                                                            <span className="text px-3">No Language</span>
                                                        }</span>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                        {/* End .sidebar-widget conadidate overview */}

                                        <div className="sidebar-widget social-media-widget">
                                            <h4 className="widget-title">Social media</h4>
                                            <div className="widget-content">
                                                <div className="social-links">
                                                    <Social
                                                        github={fullUserInfo.basicInfo?.github}
                                                        portfolioUrl={fullUserInfo.basicInfo?.portfolioUrl}
                                                        linkedinUrl={fullUserInfo.basicInfo?.linkedinUrl}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* End .sidebar-widget social-media-widget */}

                                        <div className="sidebar-widget">
                                            <h4 className="widget-title">Professional Skills</h4>
                                            <div className="widget-content">
                                                <ul className="job-skills">
                                                    {fullUserInfo.skills?.length > 0 ?
                                                        < JobSkills skills={fullUserInfo.skills} />
                                                        :
                                                        <span className="text px-3">No Skills</span>
                                                    }
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="sidebar-widget">
                                            <h4 className="widget-title">All CV versions</h4>
                                            <div className="widget-content">
                                                <ul className="job-skills">
                                                    {fullUserInfo.Cvs?.length > 0 ?
                                                        < Cvs cvs={fullUserInfo.Cvs} />
                                                        :
                                                        <span className="text px-3">No Cvs</span>
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End .sidebar-widget skill widget */}

                                        {/* <div className="sidebar-widget contact-widget">
                                            <h4 className="widget-title">Contact Us</h4>
                                            <div className="widget-content">
                                                <div className="default-form">
                                                    <Contact />
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* End .sidebar-widget contact-widget */}
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

            {applicant && findUser ? <FooterDefault footerStyle="alternate5" /> : ""}
            {/* <!-- End Main Footer --> */}
        </>
    );
};

export default index;
// .icon-Email:before {
// 	content: "\e854";
// }
// .icon-Phone-2:before {
// 	content: "\eb58";
// }
// .icon-Phone-3:before {
// 	content: "\eb59";
// }