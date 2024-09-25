import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useToken from "@/utils/useToken";
import { useDispatch, useSelector } from "react-redux";
import { deleteApplicant, getAllApplicants } from "@/mainData/users/handleRequests";
import { setCurrentPage } from '@/mainData/users/usersSlice';

const DeleteModal = ({ id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const { token } = useToken()
    const { requestState, currentPage, users } = useSelector((state) => state.users);

    const handleDelete = () => {
        dispatch(deleteApplicant({ id, token })).unwrap().then(
            () => {
                handleClose();
                if (users.length === 1 && currentPage > 1) {
                    dispatch(setCurrentPage(currentPage - 1))
                    dispatch(getAllApplicants({ currentPage: currentPage - 1, token }))
                }

                else {
                    dispatch(getAllApplicants({ currentPage, token }))
                }
            },
            (error) => {
                // Handle any errors here
                console.error("Failed to delete user:", error);
            }
        );
    }

    return (
        <>
            <button data-text="Delete Applicant" onClick={handleShow}>
                <span className="la la-trash"></span>
            </button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this User?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete} disabled={!requestState}>
                        Delete
                        {!requestState && (
                            <span
                                className="spinner-border spinner-border-sm mx-2"
                                role="status"
                                aria-live="polite"
                            ></span>
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteModal;
