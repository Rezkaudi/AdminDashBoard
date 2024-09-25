"use client"

import { useState } from 'react';
import { changePassword } from '@/mainData/auth/handleRequests';
import useToken from '@/utils/useToken';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Form = () => {
  const { token } = useToken();
  const router = useRouter();
  const dispatch = useDispatch();
  const { requestState } = useSelector((state) => state.auth);

  const [adminPasswords, setAdminPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminPasswords(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if newPassword and confirmPassword match
    if (adminPasswords.newPassword !== adminPasswords.confirmPassword) {
      alert('New password and Confirm password do not match.');
      return; // Stop execution if passwords do not match
    }

    try {
      const resultAction = await dispatch(changePassword({ adminPasswords, token }));
      unwrapResult(resultAction); // This will throw an error if the action was rejected
      router.push("/");
    } catch (error) {
      console.error('change password failed', error);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>Old Password</label>
          <input type="text" name="oldPassword" value={adminPasswords.oldPassword} onChange={handleChange} required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>New Password</label>
          <input type="password" name="newPassword" value={adminPasswords.newPassword} onChange={handleChange} required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-7 col-md-12">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={adminPasswords.confirmPassword} onChange={handleChange} required />
        </div>

        {
          adminPasswords.newPassword !== adminPasswords.confirmPassword &&
          <div className="alert alert-danger" role="alert">
            New password and Confirm password do not match!
          </div>
        }
        {/* <!-- Submit Button --> */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one" disabled={!requestState}>
            Update
            {!requestState && (
              <span
                className="spinner-border spinner-border-sm mx-2"
                role="status"
                aria-live="polite"
              ></span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;