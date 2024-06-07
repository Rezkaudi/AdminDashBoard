"use client"
import Link from "next/link";
import Image from "next/image";

import useToken from "@/utils/useToken";
import { useSelector, useDispatch } from "react-redux";
import { deleteCompany } from "@/mainData/company/handleRequests";
import Pagination from "./Pagination";

const JobListingsTable = () => {

  const dispatch = useDispatch()
  const { token } = useToken()
  const { companies } = useSelector(state => state.companies)

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>List Of Companies</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          {/* <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select> */}
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Applications</th>
                <th>Created & Expired</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="w-100">
              {companies ? companies.map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <div className="content">
                          <span className="company-logo">
                            <Image
                              width={50}
                              height={49}
                              className="rounded"
                              src={'/images/resource/candidate-1.png'}
                              alt="logo"
                            />
                          </span>
                          <h4>
                            <Link href={`/job-single-v3/${item.id}`}>
                              {item.email}
                            </Link>
                          </h4>
                          <ul className="job-info">
                            <li>
                              <span className="icon flaticon-briefcase"></span>
                              {item.name}
                            </li>
                            <li>
                              <span className="icon flaticon-map-locator"></span>
                              London, UK
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="applied">
                    <a href="#">3+ Applied</a>
                  </td>
                  <td>
                    {item.joinDate}
                  </td>
                  <td className="status">Active</td>
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button data-text="View Aplication">
                            <span className="la la-eye"></span>
                          </button>
                        </li>
                        <li>
                          <button data-text="Reject Aplication">
                            <span className="la la-pencil"></span>
                          </button>
                        </li>
                        <li>
                          <button data-text="Delete Aplication" onClick={() => { dispatch(deleteCompany({ id: item.id, token })) }}>
                            <span className="la la-trash"></span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="">
                    <div className="mx-auto spinner-border text-primary d-flex justify-content-center" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              )
              }
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default JobListingsTable;
