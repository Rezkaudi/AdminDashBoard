"use client"

import Link from "next/link";
import MobileSidebar from "./mobile-sidebar";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { handleShowModal } from "@/mainData/loginPopup/loginPopupSlice";


const MobileMenu = () => {
  // const isLoggedIn = getAuthStatus()
  const dispatch = useDispatch()
  const handleShow = () => dispatch(handleShowModal())

  return (
    // <!-- Main Header-->
    <header className="main-header main-header-mobile">
      <div className="auto-container">
        {/* <!-- Main box --> */}
        <div className="inner-box">
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

            <MobileSidebar />
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}

          <div className="outer-box">
            {/* <div className="login-box">
              <button
                className="call-modal"
                onClick={handleShow}
              >
                <span className="icon icon-user"></span>
              </button>
            </div> */}
            {/* login popup end */}

            <a
              href="#"
              className="mobile-nav-toggler"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
            >
              <span className="flaticon-menu-1"></span>
            </a>
            {/* right humberger menu */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileMenu;
