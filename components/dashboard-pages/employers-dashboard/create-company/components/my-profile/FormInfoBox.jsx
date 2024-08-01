"use client"

import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToken from '@/utils/useToken'
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { createCompany, editCompany } from '@/mainData/company/handleRequests';

const FormInfoBox = () => {
    const dispatch = useDispatch();
    const { token } = useToken();
    const router = useRouter();
    const { requestState } = useSelector((state) => state.companies);
    const [companyData, setCompanyData] = useState({
        name: "",
        email: "",
        address: "",
        password: ""
    });

    const handleChange = (e) => {
        // console.log('Handling change:', e.target.name, e.target.value); // Debug log
        setCompanyData({ ...companyData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(createCompany({ companyData, token }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/employers-dashboard/all-companies");
        } catch (error) {
            console.error('Create company failed', error); 
        }
    }

    return (
        <form className="default-form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-lg-6 col-md-12">
                    <label>Company name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={companyData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={companyData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter Address"
                        value={companyData.address}
                        onChange={handleChange}
                        autoComplete='false'
                        // required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={companyData.password}
                        onChange={handleChange}
                        autoComplete='false'
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
    );
};

export default FormInfoBox;