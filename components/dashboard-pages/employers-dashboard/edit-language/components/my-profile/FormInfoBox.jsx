"use client"

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToken from '@/utils/useToken'
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { getCompany, editCompany } from '@/mainData/company/handleRequests';
import { editLanguage } from '@/mainData/languages/handleRequests';

const FormInfoBox = ({ id }) => {
    const dispatch = useDispatch();
    const { token } = useToken();
    const router = useRouter();
    const { findCompany, requestState } = useSelector((state) => state.languages);
    const [formData, setFormData] = useState({
        name: ""
    });

    useEffect(() => {
        dispatch(getCompany({ id, token }));
    }, [dispatch, id, token]);

    useEffect(() => {
        if (findCompany) {
            console.log('Updating form data:', findCompany); // Debug log
            setFormData({
                name: findCompany.name,
                email: findCompany.email,
                address: findCompany.address,
            });
        }
    }, [findCompany]);

    const handleChange = (e) => {
        // console.log('Handling change:', e.target.name, e.target.value); // Debug log
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(editCompany({ id, token, newData: formData }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/employers-dashboard/all-companies");
        } catch (error) {
            console.error('Edit company failed', error); 
        }
    }

    return (
        <>
            {findCompany ? (
                <form className="default-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-lg-6 col-md-12">
                            <label>Company name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter New Name"
                                value={formData.name}
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

                        <div className="form-group col-lg-6 col-md-12">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Enter New Address"
                                value={formData.address}
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