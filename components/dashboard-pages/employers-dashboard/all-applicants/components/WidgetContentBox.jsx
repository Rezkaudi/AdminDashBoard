"use client";

// import candidatesData from "../../../../../data/candidates";
import Pagination from "./Pagination";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import { useSelector,  } from "react-redux";
import DeleteModal from "./DeleteModal";

const WidgetContentBox = () => {

  const { users, totalCount } = useSelector(state => state.users)


  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            {/* <h6>Senior Product Designer</h6> */}

            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals mx-auto"> Total(s): {totalCount}</Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row">
                {users ?
                  users.map((user) => (
                    <div
                      className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                      key={user.id}
                    >
                      <div className="inner-box">
                        <div className="content">
                          <figure className="image">
                            <Image
                              width={90}
                              height={90}
                              src={'/images/resource/candidate-1.png'}
                              alt="candidates"
                            />
                          </figure>
                          <h4 className="name">
                            <Link href={`/employers-dashboard/applicant-profile/${user.id}`}>
                              {user.firstName} {user.lastName}
                            </Link>
                          </h4>

                          <ul className="candidate-info">
                            {/* <li className="designation">
                              {"developer"}
                            </li> */}
                            <li>
                              <span className="icon flaticon-email"></span>{" "}
                              {user.email}
                            </li>
                            <li>
                              <span className="icon flaticon-phone"></span>
                              {user.phone ? user.phone : "0000"}
                            </li>
                          </ul>
                        </div>
                        {/* End content */}

                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="View Applicant Profile">
                                <Link data-text="View Applicant Profile" href={`/employers-dashboard/applicant-profile/${user.id}`}>
                                  <span className="la la-eye"></span>
                                </Link>
                              </button>
                            </li>
                            <li>
                              <button data-text="Edit Applicant">
                                <Link data-text="Edit Applicant" href={`/employers-dashboard/edit-applicant/${user.id}`}>
                                  <span className="la la-pencil"></span>
                                </Link >
                              </button>
                            </li>
                            <li>
                              <DeleteModal id={user.id}/>
                            </li>
                          </ul>
                        </div>
                        {/* End admin options box */}
                      </div>
                    </div>
                  )) : (
                    <div className="spinner-border text-primary mx-auto" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )
                }
              </div>
            </TabPanel>
            {/* End total applicants */}
          </div>
        </Tabs>
      </div>
      <Pagination />
    </div>
  );
};

export default WidgetContentBox;
