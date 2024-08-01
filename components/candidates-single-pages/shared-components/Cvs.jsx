import Api from "@/utils/Api";

const Cvs = ({cvs}) => {

  return (
    <ul className="job-skills">
      {cvs.map((cv, i) => (
        <li key={i}>
          <a href={`${Api}/${cv.filePath}`}>version {cv.version}</a>
        </li>
      ))}
    </ul>
  );
};

export default Cvs;
