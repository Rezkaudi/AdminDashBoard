import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useToken from "@/utils/useToken";
import { useDispatch } from "react-redux";
import { deleteJop } from "@/mainData/jops/handleRequests";

const DeleteModal = ({ id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const { token } = useToken()

    const handleDelete = () => {
        dispatch(deleteJop({ id, token }))
        handleClose()
    }

    return (
        <>
            <button className="bookmark-btn" data-text="Delete Jop" onClick={handleShow}>
                <span className="flaticon-delete"></span>
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
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteModal;
