"use client";

// import candidatesData from "../../../../../data/candidates";
import Pagination from "./Pagination";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import useToken from "@/utils/useToken";
import { useSelector, } from "react-redux";
import DeleteModal from "./DeleteModal";
import { useEffect } from "react";
import { getAllApplicants } from "@/mainData/users/handleRequests";
import { useDispatch } from "react-redux";



const WidgetContentBox = () => {

  const dispatch = useDispatch();
  const { token } = useToken();
  const { users, totalCount, currentPage } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(getAllApplicants({ currentPage, token }));
  }, [])

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
              <div className="row pb-3">
                {users && users.length > 0 ?
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
                            <Link href={`user/${user.id}`}>
                              {user.firstName} {user.lastName}
                            </Link>
                          </h4>

                          <ul className="candidate-info">
                            {/* <li className="designation">
                              {"developer"}
                            </li> */}
                            <li>
                              <span className="icon flaticon-email"></span>
                              {user.email}
                            </li>
                            {user.phone &&
                              <li>
                                <span className="icon flaticon-phone"></span>
                                {user.phone}
                              </li>
                            }

                          </ul>
                        </div>
                        {/* End content */}

                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="View Applicant Profile">
                                <Link data-text="View Applicant Profile" href={`/user/${user.id}`}>
                                  <span className="la la-eye"></span>
                                </Link>
                              </button>
                            </li>
                            <li>
                              <button data-text="Edit Applicant">
                                <Link data-text="Edit Applicant" href={`/edit-user/${user.id}`}>
                                  <span className="la la-pencil"></span>
                                </Link >
                              </button>
                            </li>
                            <li>
                              <DeleteModal id={user.id} />
                            </li>
                          </ul>
                        </div>
                        {/* End admin options box */}
                      </div>
                    </div>
                  )) :
                  users && users.length === 0 ?
                    <div className="text-center">
                      <span> No Users Found.</span>
                    </div>
                    : (
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
      {users?.length > 0 && <Pagination />}
    </div>
  );
};

export default WidgetContentBox;
