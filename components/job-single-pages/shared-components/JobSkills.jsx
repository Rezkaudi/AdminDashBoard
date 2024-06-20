
const JobSkills = ({ data ,name}) => {
  return (
    <>
      {
        data.length > 0 ?
          <ul className="job-skills">
            {data.map((skill, i) => (
              <li key={i}>
                <a href="#">{skill.name}</a>
              </li>
            ))}
          </ul>
          :
          <span>There is no {name}</span>
      }
    </>
  );
};

export default JobSkills;
