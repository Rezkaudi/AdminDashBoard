"use client"

import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToken from '@/utils/useToken'
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { getUser, editUser } from '@/mainData/users/handleRequests';

const FormInfoBox = ({ id }) => {
    const dispatch = useDispatch();
    const { token } = useToken();
    const router = useRouter();
    const { findUser, requestState } = useSelector((state) => state.users);
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
    });

    useEffect(() => {
        dispatch(getUser({ id, token }));
    }, [dispatch, id, token]);

    useEffect(() => {
        if (findUser) {
            // console.log('Updating form data:', findUser); // Debug log
            setFormData({
                email: findUser.email,
                firstName: findUser.firstName,
                lastName: findUser.lastName,
            });
        }
    }, [findUser]);

    const handleChange = (e) => {
        // console.log('Handling change:', e.target.name, e.target.value); // Debug log
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(editUser({ id, token, newData: formData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/employers-dashboard/all-users");
        } catch (error) {
            console.error('Edit company failed', error);
        }
    }

    return (
        <>
            {findUser ? (
                <form className="default-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-lg-6 col-md-12">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter New First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter New Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter New Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group col-lg-6 col-md-12 w-100">
                            <button type="submit" className="theme-btn btn-style-one" disabled={!requestState}>
                                Save
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
            ) : (
                <div className="w-100 d-flex mb-5">
                    <div className="spinner-border text-primary mx-auto" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default FormInfoBox;