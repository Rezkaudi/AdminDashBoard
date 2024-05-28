"use client";

// import candidatesData from "../../../../../data/candidates";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Api from "@/utils/Api";
import { toast } from "react-toastify";
import useToken from "@/utils/useToken";


const WidgetContentBox = () => {

  const [candidatesData, setCandidatesData] = useState(null)
  const { token } = useToken()

  const getAllApplicant = async () => {
    try {
      const response = await fetch(`${Api}/admin/users?pageNumber=1&pageSize=50`, {
        method: 'GET',
        headers: {
          'auth': token,
          // Add other necessary headers here
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message)
        setCandidatesData(data.data.list); // Assuming the API returns an object with a 'users' array
      }
      else {
        toast.error(data.message)
      }

    } catch (err) {
      toast.error("network error")
    }
  };


  const deleteApplicant = async (id) => {
    try {
      const response = await fetch(`${Api}/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Auth': token, // Replace YOUR_AUTH_TOKEN_HERE with your actual auth token
          // Add any other necessary headers here
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message)
        getAllApplicant()
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error("network error");
    }

  };


  useEffect(() => {
    getAllApplicant()
  }, [])

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h6>Senior Product Designer</h6>

            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals"> Total(s): {candidatesData && candidatesData.length}</Tab>
              <Tab className="tab-btn approved"> Approved: 2</Tab>
              <Tab className="tab-btn rejected"> Rejected(s): 4</Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row">
                {candidatesData ?
                  candidatesData.map((candidate) => (
                    <div
                      className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                      key={candidate.id}
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
                              {candidate.firstName} {candidate.lastName}
                            </Link>
                          </h4>

                          <ul className="candidate-info">
                            <li className="designation">
                              {"developer"}
                            </li>
                            <li>
                              {/* <span className="icon flaticon-map-locator"></span>{" "} */}
                              {candidate.email}
                            </li>
                            <li>
                              {/* <span className="icon flaticon-money"></span>  */}
                              {candidate.phone}
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
                              <button data-text="Delete Aplication" onClick={() => deleteApplicant(candidate.id)}>
                                <span className="la la-trash"></span>
                              </button>
                            </li>
                          </ul>
                        </div>
                        {/* End admin options box */}
                      </div>
                    </div>
                  )) : (<div className="spinner-border text-primary mx-auto" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>)
                }
              </div>
            </TabPanel>

            {/* End total applicants */}

            <TabPanel>
              <div className="row">
                {false ? candidatesData.map((candidate) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={candidate.id}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <Image
                            width={90}
                            height={90}
                            src={candidate.avatar}
                            alt="candidates"
                          />
                        </figure>
                        <h4 className="name">
                          <Link href={`/candidates-single-v1/${candidate.id}`}>
                            {candidate.name}
                          </Link>
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">
                            {candidate.designation}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {candidate.location}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span> $
                            {candidate.hourlyRate} / hour
                          </li>
                        </ul>
                        {/* End candidate-info */}

                        <ul className="post-tags">
                          {candidate.tags.map((val, i) => (
                            <li key={i}>
                              <a href="#">{val}</a>
                            </li>
                          ))}
                        </ul>
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
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      {/* End admin options box */}
                    </div>
                  </div>
                )) : (<div className="spinner-border text-primary mx-auto" role="status">
                  <span className="sr-only">Loading...</span>
                </div>)
                }
              </div>
            </TabPanel>
            {/* End approved applicants */}

            <TabPanel>
              <div className="row">
                {false ? candidatesData.map((candidate) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={candidate.id}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <Image
                            width={90}
                            height={90}
                            src={candidate.avatar}
                            alt="candidates"
                          />
                        </figure>
                        <h4 className="name">
                          <Link href={`/candidates-single-v1/${candidate.id}`}>
                            {candidate.name}
                          </Link>
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">
                            {candidate.designation}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {candidate.location}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span> $
                            {candidate.hourlyRate} / hour
                          </li>
                        </ul>
                        {/* End candidate-info */}

                        <ul className="post-tags">
                          {candidate.tags.map((val, i) => (
                            <li key={i}>
                              <a href="#">{val}</a>
                            </li>
                          ))}
                        </ul>
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
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      {/* End admin options box */}
                    </div>
                  </div>
                )) : (<div className="spinner-border text-primary mx-auto" role="status">
                  <span className="sr-only">Loading...</span>
                </div>)}
              </div>
            </TabPanel>
            {/* End rejected applicants */}


          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default WidgetContentBox;
