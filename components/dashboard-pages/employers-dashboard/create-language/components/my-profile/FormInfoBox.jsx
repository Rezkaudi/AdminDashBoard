"use client"

import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToken from '@/utils/useToken'
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';

import { createLanguage } from '@/mainData/languages/handleRequests';

const FormInfoBox = () => {
    const dispatch = useDispatch();
    const { token } = useToken();
    const router = useRouter();
    const { requestState } = useSelector((state) => state.languages);
    const [languageData, setLanguageData] = useState({
        name: ""
    });

    const handleChange = (e) => {
        setLanguageData({ ...languageData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(createLanguage({ languageData, token }));
            unwrapResult(resultAction); // This will throw an error if the action was rejected
            router.push("/employers-dashboard/all-languages");
        } catch (error) {
            console.error('Create language failed', error);
        }
    }

    return (
        <form className="default-form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-lg-6 col-md-12">
                    <label>Language name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={languageData.name}
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
    );
};

export default FormInfoBox;