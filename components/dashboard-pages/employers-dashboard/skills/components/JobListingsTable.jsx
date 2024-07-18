"use client"
import Link from "next/link";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import DeleteModal from './DeleteModal'
import EditModal from "./EditModal";

const JobListingsTable = () => {


  const { skills } = useSelector(state => state.skills)

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>List Of Skills</h4>

        <div className="chosen-outer">
          <Link href={"/employers-dashboard/create-skill"} className="theme-btn btn-style-one">
            Create New Skill
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
                <th>Skills Name</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="w-100">
              {skills ? skills.map((item) => (
                <tr key={item.id}>
                  <td>
                    {/* <!-- Job Block --> */}
                    <div className="job-block">
                      <div className="inner-box">
                        <h4>
                          {item.name}
                        </h4>
                      </div>
                    </div>
                  </td>
                  {/* <td className="applied">
                    <a href="#">3+ Applied</a>
                  </td> */}
                  <td>
                    {item.createdAt}
                  </td>
                  {/* <td className="status">Active</td> */}
                  <td>
                    <div className="option-box">
                      <ul className="option-list">
                        <li>
                          <EditModal id={item.id} name={item.name} />
                        </li>
                        <li>
                          <DeleteModal id={item.id} />
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
