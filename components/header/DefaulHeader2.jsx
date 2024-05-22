"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import LoginPopup from "../common/form/login/LoginPopup";



const DefaulHeader2 = ({show,handleClose,handleShow}) => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);


  return (
    // <!-- Main Header-->
    <header
      className={`main-header  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      {/* <!-- Main box --> */}
      <div className="main-box">
        {/* <!--Nav Outer --> */}
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link href="/">
                <Image
                  width={154}
                  height={50}
                  src="/images/logo.svg"
                  alt="brand"
                />
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          {/* <!-- Add Listing --> */}
          <Link href="/candidates-dashboard/cv-manager" className="upload-cv">
            Upload your CV
          </Link>
          {/* <!-- Login/Register --> */}
          <div className="btn-box">
            <button
              className="theme-btn btn-style-three call-modal mx-4"
              // data-bs-toggle="modal"
              // data-bs-target="#loginPopupModal"
              onClick={handleShow}
            >
              Login
            </button>
            <LoginPopup show={show} handleClose={handleClose} handleShow={handleShow}/>

            <Link
              href="/employers-dashboard/post-jobs"
              className="theme-btn btn-style-one"
            >
              Job Post
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
