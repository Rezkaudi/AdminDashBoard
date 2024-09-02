"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";

const JopApplicants = ({ applicants }) => {

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            {/* <h6>Senior Product Designer</h6> */}

            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals mx-auto">All Job Applicants : {applicants.length}</Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row pb-3">
                {applicants && applicants.length > 0 ?
                  applicants.map((user) => (
                    <>
                      {user && <div
                        className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                        key={user.id}
                      >
                        <Link href={`/user/${user.id}`}>
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
                                {user.firstName} {user.lastName}
                              </h4>

                              <ul className="candidate-info">
                                <li>
                                  <span className="icon flaticon-email"></span>
                                  {user.email}
                                </li>
                              </ul>
                            </div>

                          </div>
                        </Link>
                      </div>}
                    </>
                  )) :
                  applicants && applicants.length === 0 ?
                    <div className="text-center">
                      <span> No applicants Found.</span>
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
      {/* {users?.length > 0 && <Pagination />} */}
    </div>
  );
};

export default JopApplicants;
