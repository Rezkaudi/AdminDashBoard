"use client"
import Link from "next/link";
import useToken from "@/utils/useToken";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "./Pagination";
import DeleteModal from './DeleteModal'
import { getAllCompanies } from "@/mainData/company/handleRequests";
import { useEffect } from "react";
import { truncateString } from "@/utils/algorithms";

const JobListingsTable = () => {
  const dispatch = useDispatch();
  const { token } = useToken();

  const { companies, currentPage, totalCount } = useSelector(state => state.companies)

  useEffect(() => {
    dispatch(getAllCompanies({ currentPage, token }));
  }, [])

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>List Of Companies - {totalCount}</h4>

        <div className="chosen-outer">
          <Link href={"/employers-dashboard/create-company"} className="theme-btn btn-style-one">
            Create New Company
          </Link>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="w-100">
              {companies ? companies.map((item) => (
                <tr key={item.id} >
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
                            <Link
                              href={`/employers-dashboard/company-profile/${item.id}`}
                            >
                              {item.name}
                            </Link>
                          </h4>
                          <ul className="job-info">
                            <li>
                              <span className="icon flaticon-briefcase" ></span>
                              {item.email}
                            </li>
                            {!!item.address && <li>
                              <span className="icon flaticon-map-locator" ></span>
                              {item.address}
                            </li>}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* <td className="applied">
                    <a href="#">3+ Applied</a>
                  </td> */}
                  <td>
                    {item.joinDate}
                  </td>
                  {/* <td className="status">Active</td> */}
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <button data-text="View Company Profile">
                            <Link data-text="View Company Profile" href={`/employers-dashboard/company-profile/${item.id}`}>
                              <span className="la la-eye"></span>
                            </Link>
                          </button>
                        </li>
                        <li>
                          <button data-text="Edit Company">
                            <Link data-text="Edit Company" href={`/employers-dashboard/edit-company/${item.id}`}>
                              <span className="la la-pencil"></span>
                            </Link>
                          </button>
                        </li>
                        <li>
                          <DeleteModal id={item.id} />
                          {/*  */}
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
