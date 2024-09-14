"use client"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStatistics } from "@/mainData/dashboard/handleRequests";
import useToken from "@/utils/useToken";

const TopCardBlock = () => {

  const dispatch = useDispatch()
  const { statistics } = useSelector((state) => state.dashboard);
  const { token } = useToken();

  useEffect(() => {
    dispatch(getStatistics({ token }))
  }, [])

  const cardContent = [
    {
      id: 1,
      icon: "flaticon-briefcase",
      countNumber: statistics?.totalUsers || "...",
      metaName: "Total Users",
      uiClass: "ui-blue",
    },
    {
      id: 2,
      icon: "la-file-invoice",
      countNumber: statistics?.totalJobs || "...",
      metaName: "Total Jobs",
      uiClass: "ui-red",
    },
    {
      id: 3,
      icon: "la-comment-o",
      countNumber: statistics?.totalUsersLastMonth || "...",
      metaName: "Total Users Last Month",
      uiClass: "ui-yellow",
    },
    {
      id: 4,
      icon: "la-language",
      countNumber: statistics?.totalJobsLastMonth || "...",
      metaName: "Total Jobs Last Month",
      uiClass: "ui-red",
    },
    // {
    //   id: 5,
    //   icon: "la-bookmark-o",
    //   countNumber: statistics? || "...",
    //   metaName: "Skills",
    //   uiClass: "ui-green",
    // },
    // {
    //   id: 4,
    //   icon: "la-bookmark-o",
    //   countNumber: statistics? || "...",
    //   metaName: "Shortlist",
    //   uiClass: "ui-green",
    // },
  ];

  return (
    <>
      {cardContent.map((item) => (
        <div
          className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className={`ui-item ${item.uiClass}`}>
            <div className="left">
              <i className={`icon la ${item.icon}`}></i>
            </div>
            <div className="right">
              <h4>{item.countNumber}</h4>
              <p>{item.metaName}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopCardBlock;
