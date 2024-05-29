"use client";

import LogOut from "../common/form/logout/LogOut";
import Link from "next/link";
import { useEffect, useState } from "react";

import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";
import LoginPopup from "../common/form/login/LoginPopup";
import { useSelector, useDispatch } from "react-redux";
import { handleShowModal } from "@/mainData/loginPopup/loginPopupSlice";
import { useRouter } from "next/navigation";
import { stateus } from "@/utils/status";

const DefaulHeader2 = () => {
  const [navbar, setNavbar] = useState(false);
  const router = useRouter()
  const { show } = useSelector((state) => state.loginPopup);
  const dispatch = useDispatch()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const state = stateus()

  useEffect(() => {
    setIsLoggedIn(state)
  }, [isLoggedIn])

  const handleShow = () => {
    dispatch(handleShowModal())
  }

  const handelLogout = () => {
    router.push('/logout')
  }

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
      className={`main-header  ${navbar ? "fixed-header animated slideInDown" : ""
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
            {!!isLoggedIn ?
              <button
                className="theme-btn btn-style-three call-modal mx-4"
                onClick={handelLogout}
              >
                Logout
              </button> :
              <button
                className="theme-btn btn-style-three call-modal mx-4"
                onClick={handleShow}
              >
                Login
              </button>
            }
            <LoginPopup show={show} />

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
