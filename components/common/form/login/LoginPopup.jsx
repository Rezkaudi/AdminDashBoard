"use client"
import Register from "../register/Register";
import FormContent from "./FormContent";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useDispatch } from "react-redux";
import { handleCloseModal, handleShowModal } from "@/mainData/loginPopup/loginPopupSlice";
import { useEffect } from "react";

const LoginPopup = ({show}) => {
  
  const dispatch = useDispatch()

  const handleClose = () => dispatch(handleCloseModal());

  return (
    <>

      <Modal
        className="modal fade"
        // data-bs-backdrop="static"
        // data-bs-keyboard="false"
        // tabindex="-1"
        id="loginPopupModal"
        show={show} onHide={handleClose}
      >
        <div>
          <div className="modal-content">
            <button
              type="button"
              className="closed-modal"
              onClick={handleClose}
            ></button>
            {/* End close modal btn */}

            <div className="modal-body">
              {/* <!-- Login modal --> */}
              <div id="login-modal">
                {/* <!-- Login Form --> */}
                <div className="login-form default-form">
                  <FormContent handleClose={handleClose} />
                </div>
                {/* <!--End Login Form --> */}
              </div>
              {/* <!-- End Login Module --> */}
            </div>
            {/* En modal-body */}
          </div>
          {/* End modal-content */}
        </div>
      </Modal>
      {/* <!-- Login Popup Modal --> */}


      {/* <!-- Login Popup Modal --> */}
    </>
  );
};

export default LoginPopup;
