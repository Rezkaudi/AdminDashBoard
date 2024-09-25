import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editLanguage,getAllLanguages } from '@/mainData/languages/handleRequests';
import useToken from "@/utils/useToken";
import { useDispatch, useSelector } from "react-redux";

const EditModal = ({ id, name }) => {
    const [show, setShow] = useState(false);
    const [newLanguageData, setNewLanguageData] = useState({
        name: name
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const { token } = useToken()
    const { requestState,currentPage } = useSelector((state) => state.languages);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLanguageData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editLanguage({ id, token, newLanguageData })).unwrap().then(
            () => {
                // Deletion was successful, close the modal
                handleClose();
                dispatch(getAllLanguages({ currentPage, token }));
            },
            (error) => {
                // Handle any errors here
                console.error("Failed to edit language:", error);
            }
        );
    }

    return (
        <>
            <button data-text="Edit Language" onClick={handleShow}>
                <span className="la la-pencil"></span>
            </button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Edit Language</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="default-form" onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="form-group col-lg-6 col-md-12">
                                <label>Language name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter New Language Name"
                                    value={newLanguageData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type='submit' variant="success" disabled={!requestState}>
                                Submit
                                {!requestState && (
                                    <span
                                        className="spinner-border spinner-border-sm mx-2"
                                        role="status"
                                        aria-live="polite"
                                    ></span>
                                )}
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>

            </Modal>
        </>
    );
};

export default EditModal;
