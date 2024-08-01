import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";

import MenuToggler from "../../MenuToggler";
import Pagination from "./components/Pagination";

import JobSearchForm from "./components/JobSearchForm";
import FilterJobBox from "./components/FilterJobBox";

const index = () => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      {/* <LoginPopup /> */}
      {/* End Login Popup Modal */}

      <DashboardHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="All Jobs!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <section className="page-title style-three">
            <div className="auto-container">
              <JobSearchForm />
            </div>
          </section>

          <section className="ls-section style-three">
            <div className="auto-container">
              <div className="row">
                <div className="content-column col-lg-12">
                  <div className="ls-outer">
                    <FilterJobBox />
                  </div>
                </div>
                {/* <!-- End Content Column --> */}
              </div>
              {/* End row */}
            </div>
            {/* End container */}
          </section>

          {/* <Pagination /> */}
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      {/* <CopyrightFooter /> */}
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
