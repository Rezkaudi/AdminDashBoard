"use client";

// import candidatesData from "../../../../../data/candidates";
import Pagination from "./Pagination";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Api from "@/utils/Api";
import { toast } from "react-toastify";
import useToken from "@/utils/useToken";
import { useSelector, useDispatch } from "react-redux";
import { deleteApplicant } from "@/mainData/users/handleRequests";

const WidgetContentBox = () => {

  const dispatch = useDispatch()
  const { token } = useToken()
  const { users, totalCount } = useSelector(state => state.users)


  // useEffect(() => {
  //   dispatch(getAllApplicants({ currentPage, token }))
  // }, [])

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
                            <Link href={`/candidates-single-v1/1`}>
                              {user.firstName} {user.lastName}
                            </Link>
                          </h4>

                          <ul className="candidate-info">
                            <li className="designation">
                              {"developer"}
                            </li>
                            <li>
                              {/* <span className="icon flaticon-map-locator"></span>{" "} */}
                              {user.email}
                            </li>
                            <li>
                              {/* <span className="icon flaticon-money"></span>  */}
                              {user.phone}
                            </li>
                          </ul>
                          {/* End candidate-info */}

                          {/* <ul className="post-tags">
                            {candidate.tags.map((val, i) => (
                              <li key={i}>
                                <a href="#">{val}</a>
                              </li>
                            ))}
                          </ul> */}
                        </div>
                        {/* End content */}

                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="View Aplication">
                                <span className="la la-eye"></span>
                              </button>
                            </li>
                            <li>
                              <button data-text="Approve Aplication">
                                <span className="la la-check"></span>
                              </button>
                            </li>
                            <li>
                              <button data-text="Reject Aplication">
                                <span className="la la-times-circle"></span>
                              </button>
                            </li>
                            <li>
                              <button data-text="Delete Aplication" onClick={() => { dispatch(deleteApplicant({ id: user.id, token })) }}>
                                <span className="la la-trash"></span>
                              </button>
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
