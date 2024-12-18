const JobOverView = ({ jop }) => {
  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Experience:</h5>
          {jop.experienceMin!==null && jop.experienceMax!==null ?
            <span>{jop.experienceMin}-{jop.experienceMax} Years</span> :
            <span>no value</span>
          }
        </li>
        {/* <li>
          <i className="icon icon-expiry"></i>
          <h5>Expiration date:</h5>
          <span>April 06, 2021</span>
        </li>
        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>London, UK</span>
        </li> */}
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Job Title:</h5>
          <span>{jop.title}</span>
        </li>
        {/* <li>
          <i className="icon icon-clock"></i>
          <h5>Hours:</h5>
          <span>50h / week</span>
        </li>
        <li>
          <i className="icon icon-rate"></i>
          <h5>Rate:</h5>
          <span>$15 - $25 / hour</span>
        </li> */}

        <li>
          <i className="icon icon-salary"></i>
          <h5>Salary:</h5>
          {
            jop.salaryMin!==null && jop.salaryMax!==null ?
              <span>{jop.salaryMin} - {jop.salaryMax}</span> :
              <span>no value</span>
          }
        </li>

      </ul>
    </div>
  );
};

export default JobOverView;
