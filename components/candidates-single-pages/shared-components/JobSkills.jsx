const JobSkills = ({skills}) => {

  return (
    <ul className="job-skills">
      {skills.map((skill, i) => (
        <li key={i}>
          <a href="#">{skill.skillName}</a>
        </li>
      ))}
    </ul>
  );
};

export default JobSkills;
