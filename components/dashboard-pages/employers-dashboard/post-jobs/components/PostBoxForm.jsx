"use client"
import Select from "react-select";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useToken from '@/utils/useToken'
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';
import { getCompaniesByName } from "@/mainData/company/handleRequests";
import { getSkillsByName } from "@/mainData/skills/handleRequests";
import { getLanguagesByName } from "@/mainData/languages/handleRequests";
import { createJop } from '@/mainData/jops/handleRequests';

const PostBoxForm = () => {

  const dispatch = useDispatch();
  const { token } = useToken();
  const router = useRouter();
  const { requestState } = useSelector((state) => state.jops);

  const { skillsByName } = useSelector((state) => state.skills);
  const { languagesByName } = useSelector((state) => state.languages);
  const { companiesByName } = useSelector((state) => state.companies);


  // const specialisms = [
  //   { id: "id", name: "Banking" },
  //   { id: "Digital & Creative", name: "Digital & Creative" },
  //   { id: "Retail", name: "Retail" },
  //   { id: "Human Resources", name: "Human Resources" },
  //   { id: "Managemnet", name: "Managemnet" },
  //   { id: "Accounting & Finance", name: "Accounting & Finance" },
  //   { id: "Digital", name: "Digital" },
  //   { id: "Creative Art", name: "Creative Art" },
  // ];

  // useEffect(() => {
  //   dispatch(getCompaniesByName({ token }))
  //   dispatch(getSkillsByName({ token }))
  //   dispatch(getLanguagesByName({ token }))
  // }, [])


  const languagesList = languagesByName?.map(item => ({
    value: item.id,
    label: item.name
  }));

  const skillsList = skillsByName?.map(item => ({
    value: item.id,
    label: item.name
  }));

  const companiesList = companiesByName?.map(item => ({
    value: item.id,
    label: item.name
  }));

  // Initialize formData state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    companyId: '',
    location: '',
    salary: '',
    skills: [],
    languages: [],
  });

  // Handle changes for regular inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputSkill = (e) => {
    const skillName = e
    console.log(skillName);
    dispatch(getSkillsByName({ skillName, token }));
  };

  const handleInputCompany = (e) => {
    const companyName = e
    console.log(companyName);
    dispatch(getCompaniesByName({ companyName, token }));
  };

  const handleInputLanguage = (e) => {
    const LanguageName = e
    console.log(LanguageName);
    dispatch(getLanguagesByName({ LanguageName, token }));
  };

  const handleChangeCompany = (selectedOption) => {
    setFormData(prevState => ({
      ...prevState,
      companyId: selectedOption.value
    }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resultAction = await dispatch(createJop({ token, jopData: formData }));
      unwrapResult(resultAction); // This will throw an error if the action was rejected
      router.push("/employers-dashboard/all-jobs");
    } catch (error) {
      console.error('Create Jop failed', error);
    }
    console.log(formData);
  } 

  // Handle changes for multi-select inputs
  const handleMultiSelectChange = (selectedOptions, fieldName) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: selectedOptions.map(option => option.value),
    }));
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Input */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Title</label>
          <input type="text" name="title" placeholder="Enter Job Title" onChange={handleChange} required />
        </div>

        {/* About Company */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea name="description" placeholder="Enter Job Description" onChange={handleChange} required></textarea>
        </div>

        {/* Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Company</label>
          {!companiesByName && (
            <span
              className="spinner-border spinner-border-sm mx-2"
              role="status"
              aria-live="polite"
            ></span>
          )}
          <Select
            onInputChange={handleInputCompany}
            onChange={(selectedOption) => handleChangeCompany(selectedOption)} // Assuming 'companyId' is the name of the field in formData
            options={companiesList}
            placeholder="Select..."
            isSearchable
          />
        </div>

        {/* Input */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Location</label>
          <input type="text" name="location" placeholder="Enter Location" onChange={handleChange} required />
        </div>


        <div className="form-group col-lg-6 col-md-12">
          <label>Salary</label>
          <input type="text" name="salary" placeholder="Enter Salary" onChange={handleChange} required />
        </div>


        {/* Search Select for Skills */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Skills
            {!skillsByName && (
              <span
                className="spinner-border spinner-border-sm mx-2"
                role="status"
                aria-live="polite"
              ></span>
            )}
          </label>
          <Select
            isMulti
            // defaultValue={[specialisms[2]]}
            name="skills"
            options={skillsList}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'skills')}
            onInputChange={handleInputSkill}
            required
          />
        </div>

        {/* Search Select for Languages */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Languages
            {!languagesByName && (
              <span
                className="spinner-border spinner-border-sm mx-2"
                role="status"
                aria-live="polite"
              ></span>
            )}
          </label>
          <Select
            isMulti
            // defaultValue={skillsList}
            name="languages"
            options={languagesList}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'languages')}
            required
            onInputChange={handleInputLanguage}
          />
        </div>

        <div className="form-group col-lg-12 col-md-12 text-right">
          <button type='submit' className="theme-btn btn-style-one">
            Create
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

export default PostBoxForm;