import Api from "@/utils/Api";
import { getUserCv } from "@/mainData/users/handleRequests";
import { useDispatch, useSelector } from "react-redux";
import useToken from "@/utils/useToken";
import { useState } from "react";

const Cvs = ({ cvs }) => {

  const dispatch = useDispatch()
  const [cvId, setcVId] = useState(null)

  const handleDownload = (cvId) => {
    setcVId(cvId)
    dispatch(getUserCv({ cvId })).unwrap().then(
      (payload) => {
        window.open(payload, "_blank");
        setcVId(null)
      },
      (error) => {
        // Handle any errors here
        console.error("Failed to delete user:", error);
      }
    );


  }

  return (
    <ul className="job-skills">
      {cvs.map((cv, i) => (
        <li key={i}>
          <button onClick={() => handleDownload(cv.id)}>version {cv.version}
            {cv.id === cvId && (
              <span
                className="spinner-border spinner-border-sm mx-2"
                role="status"
                aria-live="polite"
              ></span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Cvs;
