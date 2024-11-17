'use client'
import Link from "next/link";
import useToken from "@/utils/useToken";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addDatePosted,
  addExperienceSelect,
  addJobTypeSelect,
  addKeyword,
  addLocation,
  addPerPage,
  addSalary,
  addSort,
} from "@/features/filter/filterSlice";
import Image from "next/image";
import Pagination from "./Pagination";
import DeleteModal from "./DeleteModal";
import { useEffect } from "react";
import { filterJops } from "@/mainData/jops/handleRequests";

const FilterJobBox = () => {
  const { token } = useToken()
  const { jops, totalCount, currentPage, filterByCompanyId, filterByTitle, filterBySkillId } = useSelector((state) => state.jops);
  const { jobList, jobSort } = useSelector((state) => state.filter);
  const {
    keyword,
    location,
    destination,
    category,
    datePosted,
    jobTypeSelect,
    experienceSelect,
    salary,
  } = jobList || {};

  const { sort, perPage } = jobSort;

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(filterJops({ currentPage, token, title: filterByTitle, skills: filterBySkillId?.value || "", companyId: filterByCompanyId?.value || "" }))
  }, [])

  // keyword filter on title
  const keywordFilter = (item) =>
    keyword !== ""
      ? item.jobTitle.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      : item;

  // location filter
  const locationFilter = (item) =>
    location !== ""
      ? item?.location
        ?.toLocaleLowerCase()
        .includes(location?.toLocaleLowerCase())
      : item;

  // location filter
  const destinationFilter = (item) =>
    item?.destination?.min >= destination?.min &&
    item?.destination?.max <= destination?.max;

  // category filter
  const categoryFilter = (item) =>
    category !== ""
      ? item?.category?.toLocaleLowerCase() === category?.toLocaleLowerCase()
      : item;

  // job-type filter
  const jobTypeFilter = (item) =>
    item.jobType !== undefined && jobTypeSelect !== ""
      ? item?.jobType[0]?.type.toLocaleLowerCase().split(" ").join("-") ===
      jobTypeSelect && item
      : item;

  // date-posted filter
  const datePostedFilter = (item) =>
    datePosted !== "all" && datePosted !== ""
      ? item?.created_at
        ?.toLocaleLowerCase()
        .split(" ")
        .join("-")
        .includes(datePosted)
      : item;

  // experience level filter
  const experienceFilter = (item) =>
    experienceSelect !== ""
      ? item?.experience?.split(" ").join("-").toLocaleLowerCase() ===
      experienceSelect && item
      : item;

  // salary filter
  const salaryFilter = (item) =>
    item?.totalSalary?.min >= salary?.min &&
    item?.totalSalary?.max <= salary?.max;

  // sort filter
  const sortFilter = (a, b) =>
    sort === "des" ? a.id > b.id && -1 : a.id < b.id && -1;

  // jobs
  //   ?.filter(keywordFilter)
  //   ?.filter(locationFilter)
  //   ?.filter(destinationFilter)
  //   ?.filter(categoryFilter)
  //   ?.filter(jobTypeFilter)
  //   ?.filter(datePostedFilter)
  //   ?.filter(experienceFilter)
  //   ?.filter(salaryFilter)
  //   ?.sort(sortFilter)
  //   .slice(perPage.start, perPage.end !== 0 ? perPage.end : 16)
  //   ?
  let content = jops?.map((item) => (
    <div className="job-block col-lg-6 col-md-12 col-sm-12" key={item.id}>
      <div className="inner-box">
        <div className="content">
          <span className="company-logo">
            <Image width={50} height={49} src={"/images/resource/company-logo/1-1.png"} alt="item brand" />
          </span>
          <h4>
            <Link href={`/job/${item.id}`}>{item.title}</Link>
          </h4>

          <ul className="job-info">
            <li>
              <span className="icon flaticon-briefcase"></span>
              <Link href={`/company/${item.Company.id}`}> {item.Company?.name}</Link>
            </li>
            {/* compnay info */}

            {/* <li>
                <span className="icon flaticon-clock-3"></span> {item.time}
              </li> */}
            {/* time info */}

            {item.salaryMin !== null && !!item.salaryMax !== null &&
              <li>
                <span className="icon flaticon-money"></span> {item.salaryMin} - {item.salaryMax}
              </li>
            }

            {/* salary info */}
          </ul>
          {/* End .job-info */}

          <ul className="job-other-info">
            {item.skills.map((val, i) => (
              <li key={i} className={"time"}>
                {val.name}
              </li>
            ))}
          </ul>
          <ul className="job-other-info">
            {item.languages.map((val, i) => (
              <li key={i} className={"privacy"}>
                {val.name}
              </li>
            ))}
          </ul>
          {/* End .job-other-info */}

          <ul className="option-list d-flex align-item-center justify-content-end">
            <li>
              <button data-text="View Job">
                <Link data-text="View Job" href={`/job/${item.id}`}>
                  <span className="la la-eye"></span>
                </Link >
              </button>
            </li>

            <li>
              <DeleteModal id={item.id} />
            </li>
            <li>
              <button data-text="Edit Job">
                <Link data-text="Edit Job" href={`/edit-job/${item.id}`}>
                  <span className="la la-pencil"></span>
                </Link >
              </button>
            </li>
          </ul>


        </div>
      </div>
    </div>
    // End all jobs
  ));

  // sort handler
  const sortHandler = (e) => {
    dispatch(addSort(e.target.value));
  };

  // per page handler
  const perPageHandler = (e) => {
    const pageData = JSON.parse(e.target.value);
    dispatch(addPerPage(pageData));
  };

  // clear all filters
  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addCategory(""));
    dispatch(addJobTypeSelect(""));
    dispatch(addDatePosted(""));
    dispatch(addExperienceSelect(""));
    dispatch(addSalary({ min: 0, max: 20000 }));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 0 }));
  };

  return (
    <>
      <div className="ls-switcher mb-3">
        <div className="showing-resul d-flex">
          <div className="text">
            <strong>{totalCount}</strong> jobs
          </div>

        </div>
        <Link href={"/create-job"} className="theme-btn btn-style-one">
          Create New Job
        </Link>

        {/* End .showing-result */}

        {/* <div className="sort-by">
          {keyword !== "" ||
            location !== "" ||
            category !== "" ||
            jobTypeSelect !== "" ||
            datePosted !== "" ||
            experienceSelect !== "" ||
            salary?.min !== 0 ||
            salary?.max !== 20000 ||
            sort !== "" ||
            perPage.start !== 0 ||
            perPage.end !== 0 ? (
            <button
              onClick={clearAll}
              className="btn btn-danger text-nowrap me-2"
              style={{ minHeight: "45px", marginBottom: "15px" }}
            >
              Clear All
            </button>
          ) : undefined}

          <select
            value={sort}
            className="chosen-single form-select"
            onChange={sortHandler}
          >
            <option value="">Sort by (default)</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>

          <select
            onChange={perPageHandler}
            className="chosen-single form-select ms-3 "
            value={JSON.stringify(perPage)}
          >
            <option
              value={JSON.stringify({
                start: 0,
                end: 0,
              })}
            >
              All
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 20,
              })}
            >
              20 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 30,
              })}
            >
              30 per page
            </option>
            <option
              value={JSON.stringify({
                start: 0,
                end: 40,
              })}
            >
              40 per page
            </option>
          </select>
        </div> */}
        {/* End sort by filter */}
      </div>
      {/* <!-- ls Switcher --> */}

      {jops && jops.length > 0 ? <div className="row">{content}</div>
        :
        jops && jops.length === 0 ?
          <div className="text-center">
            <span> No Jops Found. Create a new job to get started.</span>
          </div>
          : <div className="d-flex py-5 my-5">
            <div className="spinner-border text-primary mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
      }
      {/* End .row with jobs */}

      {jops?.length > 0 && <Pagination />}
      {/* <!-- End Pagination --> */}
    </>
  );
};

export default FilterJobBox;
