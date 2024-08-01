"use client"
import { useSelector } from "react-redux";
const TopCardBlock = () => {
  // const { totalCount: usersTotalCount } = useSelector((state) => state.users);
  // const { totalCount: companiesTotalCount } = useSelector((state) => state.companies);
  // const { totalCount: jopsTotalCount } = useSelector((state) => state.jops);
  // const { totalCount: languagesTotalCount } = useSelector((state) => state.languages);
  // const { totalCount: skillsTotalCount } = useSelector((state) => state.skills);




  const cardContent = [
    // {
    //   id: 1,
    //   icon: "flaticon-briefcase",
    //   countNumber: usersTotalCount,
    //   metaName: "Users",
    //   uiClass: "ui-blue",
    // },
    // {
    //   id: 2,
    //   icon: "la-file-invoice",
    //   countNumber: companiesTotalCount,
    //   metaName: "Companies",
    //   uiClass: "ui-red",
    // },
    // {
    //   id: 3,
    //   icon: "la-comment-o",
    //   countNumber: jopsTotalCount,
    //   metaName: "Jops",
    //   uiClass: "ui-yellow",
    // },
    // {
    //   id: 4,
    //   icon: "la-language",
    //   countNumber: languagesTotalCount,
    //   metaName: "Languages",
    //   uiClass: "ui-red",
    // },
    // {
    //   id: 5,
    //   icon: "la-bookmark-o",
    //   countNumber: skillsTotalCount,
    //   metaName: "Skills",
    //   uiClass: "ui-green",
    // },
    // {
    //   id: 4,
    //   icon: "la-bookmark-o",
    //   countNumber: "32",
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
