"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Api from "@/utils/Api";
import useAuth from "@/utils/useAuth";
import { useDispatch } from "react-redux";
import { handleCloseModal } from "@/mainData/loginPopup/loginPopupSlice";
import Cookies from "js-cookie";


const FormContent = () => {
  const router = useRouter();
  const { login } = useAuth();
  const dispatch = useDispatch()
  const handleClose = () => dispatch(handleCloseModal())


  // console.log(Cookies.get("prevURL"));

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setAdminData({
      ...adminData,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${Api}/admin/auth/login`, {
        method: "POST", // Specify method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData), // Convert adminData to JSON string
      });

      const data = await response.json(); // Parse the response as JSON

      // Assuming the server responds with a status indicating success
      if (response.ok) {
        login(data.data.accessToken, adminData.rememberMe)
        router.push("/employers-dashboard/dashboard");
        toast.success(data.message);
        handleClose()


      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      toast.error("Failed to log in.");
    } finally {
      setLoading(false); // Ensure loading is set back to false regardless of outcome
    }
  };

  return (
    <div className="form-inner">
      <h3>Login to Admin Dashboard</h3>

      {/* <!--Login Form--> */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            value={adminData.email}
            onChange={handleChange}
          />
        </div>
        {/* email */}

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={adminData.password}
            onChange={handleChange}
          />
        </div>
        {/* password */}

        <div className="form-group">
          <div className="field-outer">
            <div className="input-group checkboxes square">
              <input type="checkbox" name="rememberMe" id="rememberMe" checked={adminData.rememberMe} onChange={handleChange} />
              <label htmlFor="rememberMe" className="remember">
                <span className="custom-checkbox"></span> Remember me
              </label>
            </div>
            <a href="#" className="pwd">
              Forgot password?
            </a>
          </div>
        </div>
        {/* forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
            data-bs-dismiss={loading && "modal"}
          >
            Log In
            {loading && (
              <span
                className="spinner-border spinner-border-sm mx-2"
                role="status"
                aria-live="polite"
              ></span>
            )}
          </button>
        </div>
        {/* login */}
      </form>
      {/* End form */}

      {/* <div className="bottom-box">
        <div className="text">
          Don&apos;t have an account?{" "}
          <Link
            href="#"
            className="call-modal signup"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Signup
          </Link>
        </div>
        

        <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial />
      </div> */}
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;
