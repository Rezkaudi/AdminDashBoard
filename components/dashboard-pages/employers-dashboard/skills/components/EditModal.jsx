import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editSkill ,getAllSkills} from '@/mainData/skills/handleRequests';
import useToken from "@/utils/useToken";
import { useDispatch, useSelector } from "react-redux";

const EditModal = ({ id, name }) => {
    const [show, setShow] = useState(false);
    const [newSkillData, setNewSkillData] = useState({
        name: name
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const { token } = useToken()
    const { requestState,currentPage } = useSelector((state) => state.skills);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSkillData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editSkill({ id, token, newSkillData })).unwrap().then(
            () => {
                // Deletion was successful, close the modal
                handleClose();
                dispatch(getAllSkills({ currentPage, token }))
            },
            (error) => {
                // Handle any errors here
                console.error("Failed to edit skill:", error);
            }
        );
    }

    return (
        <>
            <button data-text="Edit Skill" onClick={handleShow}>
                <span className="la la-pencil"></span>
            </button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>Edit Skill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="default-form" onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="form-group col-lg-6 col-md-12">
                                <label>Skill name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter New Skill Name"
                                    value={newSkillData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="success" disabled={!requestState}>
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
