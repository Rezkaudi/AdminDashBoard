import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteSkill,getAllSkills } from '@/mainData/skills/handleRequests';
import useToken from "@/utils/useToken";
import {useDispatch ,useSelector} from "react-redux";

const DeleteModal = ({id}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    const { token } = useToken()
    const { requestState,currentPage } = useSelector((state) => state.skills);

    const handleDelete = () => {
        dispatch(deleteSkill({ id, token })).unwrap().then(
            () => {
                // Deletion was successful, close the modal
                handleClose();
                dispatch(getAllSkills({ currentPage, token }))

            },
            (error) => {
                // Handle any errors here
                console.error("Failed to delete company:", error);
            }
        );
    }

    return (
        <>
            <button data-text="Delete Skill" onClick={handleShow}>
                <span className="la la-trash"></span>
            </button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Delete Skill</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this Skill?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
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
