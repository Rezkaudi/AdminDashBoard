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

import { editJop, getJop } from '@/mainData/jops/handleRequests';


const PostBoxForm = ({ id }) => {

  const dispatch = useDispatch();
  const { token } = useToken();
  const router = useRouter();
  const { findJop, requestState } = useSelector((state) => state.jops);



  const { skillsByName } = useSelector((state) => state.skills);
  const { languagesByName } = useSelector((state) => state.languages);
  const { companiesByName } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(getCompaniesByName({ token }))
    dispatch(getSkillsByName({ token }))
    dispatch(getLanguagesByName({ token }))
  }, [])

  const languagesList = languagesByName?.map(specialism => ({
    value: specialism.id,
    label: specialism.name
  }));

  const skillsList = skillsByName?.map(specialism => ({
    value: specialism.id,
    label: specialism.name
  }));

  const companiesList = companiesByName?.map(item => ({
    value: item.id,
    label: item.name
  }));

  // Initialize formData state
  const [formData, setFormData] = useState(null);


  useEffect(() => {
    dispatch(getJop({ id, token })).unwrap().then(
      (payload) => {
        setFormData({
          title: payload.data?.title,
          description: payload.data?.description,
          company: {
            value: payload.data?.Company?.id, // Assuming formData?.Company is the selected company object
            label: payload.data?.Company?.name // Display name as the label
          },
          salaryMin: payload.data?.salaryMin,
          salaryMax: payload.data?.salaryMax,
          experienceMin: payload.data?.experienceMin,
          experienceMax: payload.data?.experienceMax,
          skills: payload.data?.skills?.map(skill => ({
            value: skill.id,
            label: skill.name
          })),
          languages: payload.data?.languages?.map(language => ({
            value: language.id,
            label: language.name
          })),
        })
      },
      (error) => {
        console.error("Failed to delete jop:", error);
      }
    );

  }, [dispatch, id, token]);

  // useEffect(() => {
  //   console.log('Updating form data:', findJop); // Debug log
  //   setFormData({
  //     title: findJop?.title,
  //     description: findJop?.description,
  //     company: {
  //       value: findJop?.Company.id, // Assuming formData?.Company is the selected company object
  //       label: findJop?.Company.name // Display name as the label
  //     },
  //     location: findJop?.location,
  //     salary: findJop?.salary,
  //     skills: findJop?.skills.map(skill => ({
  //       value: skill.id,
  //       label: skill.name
  //     })),
  //     languages: findJop?.languages.map(language => ({
  //       value: language.id,
  //       label: language.name
  //     })),
  //   })
  // }, [findJop]);


  // Handle changes for regular inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newJopData = {
      title: formData.title,
      description: formData.description,
      companyId: formData.company.value,
      salaryMin: formData.salaryMin,
      salaryMax: formData.salaryMax,
      experienceMin: formData.experienceMin,
      experienceMax: formData.experienceMax,
      skills: formData.skills.map(skill => skill.value),
      languages: formData.languages.map(language => language.value),
    }

    // console.log(formData);
    // console.log("   ");
    // console.log(newJopData);
    try {
      const resultAction = await dispatch(editJop({ id, token, newJopData }));
      unwrapResult(resultAction); // This will throw an error if the action was rejected
      router.push("/jobs");
    } catch (error) {
      console.error('Create Jop failed', error);
    }

  }

  const handleMultiSelectChange = (selectedOptions, fieldName) => {
    console.log(selectedOptions);
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: selectedOptions, // selectedOptions is already an array of objects with value and label
    }));
  };

  const handleInputSkill = (e) => {
    const skillName = e
    // console.log(skillName);
    dispatch(getSkillsByName({ skillName, token }));
  };

  const handleInputCompany = (e) => {
    const companyName = e
    // console.log(companyName);
    dispatch(getCompaniesByName({ companyName, token }));
  };

  const handleInputLanguage = (e) => {
    const languageName = e
    // console.log(languageName);
    dispatch(getLanguagesByName({ languageName, token }));
  };

  const handleChangeCompany = (selectedOption) => {
    setFormData(prevState => ({
      ...prevState,
      company: selectedOption
    }));
  };

  return (
    <>

      {formData && findJop ?
        <form className="default-form" onSubmit={handleSubmit}>
          <div className="row">
            {/* Input */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Job Title</label>
              <input type="text" name="title" placeholder="Enter Job Title" value={formData?.title} onChange={handleChange} required />
            </div>

            {/* About Company */}
            <div className="form-group col-lg-12 col-md-12">
              <label>Job Description</label>
              <textarea name="description" placeholder="Enter Job Description" value={formData?.description} onChange={handleChange}></textarea>
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
                defaultValue={formData.company}
                onChange={(selectedOption) => handleChangeCompany(selectedOption)} // Assuming 'companyId' is the name of the field in formData
                options={companiesList}
                placeholder="Select..."
                isSearchable
                required
              />
            </div>

            {/* Input */}
            <div className="form-group col-lg-6 col-md-12">
          <label>Min Salary</label>
          <input type="number" required={!!formData.salaryMin || !!formData.salaryMax} min={0} name="salaryMin" placeholder="Enter Min Salary" value={formData?.salaryMin} onChange={handleChange} />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Max Salary</label>
          <input type="number" required={!!formData.salaryMin || !!formData.salaryMax} min={Number(formData.salaryMin) + 1 || 0} name="salaryMax" placeholder="Enter Max Salary" value={formData?.salaryMax} onChange={handleChange} />
        </div>


        <div className="form-group col-lg-6 col-md-12">
          <label>Min Experience</label>
          <input type="number" required={!!formData.experienceMin || !!formData.experienceMax} min={0} name="experienceMin" placeholder="Enter Min Experience" value={formData?.experienceMin} onChange={handleChange} />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Max Experience</label>
          <input type="number" required={!!formData.experienceMin || !!formData.experienceMax} min={Number(formData.experienceMin) + 1 || 0} name="experienceMax" placeholder="Enter Max Experience" value={formData?.experienceMax} onChange={handleChange} />
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
                defaultValue={formData.skills}
                name="skills"
                options={skillsList}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'skills')}
                onInputChange={handleInputSkill}
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
                defaultValue={formData.languages}
                name="languages"
                options={languagesList}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'languages')}
                onInputChange={handleInputLanguage}
              />
            </div>

            <div className="form-group col-lg-12 col-md-12 text-right">
              <button type='submit' className="theme-btn btn-style-one">
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
        : (
          <div className="w-100 d-flex mb-5">
            <div className="spinner-border text-primary mx-auto" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )
      }

      {/* (
           <div className="w-100 d-flex mb-5">
             <div className="spinner-border text-primary mx-auto" role="status">
               <span className="sr-only">Loading...</span>
             </div>
           </div>
         ) */}


    </>
  );
};

export default PostBoxForm;