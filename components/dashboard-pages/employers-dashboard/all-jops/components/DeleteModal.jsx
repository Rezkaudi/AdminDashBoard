import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useToken from "@/utils/useToken";
import { useDispatch, useSelector } from "react-redux";
import { deleteJop, filterJops } from "@/mainData/jops/handleRequests";
import { setCurrentPage } from '@/mainData/jops/jopsSlice';

const DeleteModal = ({ id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const { token } = useToken()
    const { requestState, currentPage,jops } = useSelector((state) => state.jops)

    const handleDelete = () => {
        dispatch(deleteJop({ id, token })).unwrap().then(
            () => {
                // Deletion was successful, close the modal
                handleClose();
                if (jops?.length === 1 && currentPage > 1) {
                    dispatch(setCurrentPage(currentPage - 1))
                    dispatch(filterJops({ currentPage: currentPage - 1, token, title: "", skills: "", companyId: "" }))
                }
                else {
                    dispatch(filterJops({ currentPage, token, title: "", skills: "", companyId: "" }))
                }
            },
            (error) => {
                // Handle any errors here
                console.error("Failed to delete jop:", error);
            }
        );
    }

    return (
        <>
            <button data-text="Delete Jop" onClick={handleShow}>
                <span className="la la-trash"></span>
            </button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Delete Jop</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this Jop?</Modal.Body>
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
