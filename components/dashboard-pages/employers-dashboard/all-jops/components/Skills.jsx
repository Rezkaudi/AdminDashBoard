
'use client'
import Select from "react-select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "@/features/filter/filterSlice";
import useToken from '@/utils/useToken'

import { getSkillsByName } from "@/mainData/skills/handleRequests";
import { handleChangeFilters } from "@/mainData/jops/jopsSlice";

const Skills = () => {

    const dispatch = useDispatch();
    const { token } = useToken();
    const { skillsByName } = useSelector((state) => state.skills);
    const [selectedOption, setSelectedOption] = useState(null);
    const { filterBySkillId } = useSelector((state) => state.jops)


    // const specialisms = [
    //     { id: "id", name: "Banking" },
    //     { id: "Digital & Creative", name: "Digital & Creative" },
    //     { id: "Retail", name: "Retail" },
    //     { id: "Human Resources", name: "Human Resources" },
    //     { id: "Managemnet", name: "Managemnet" },
    //     { id: "Accounting & Finance", name: "Accounting & Finance" },
    //     { id: "Digital", name: "Digital" },
    //     { id: "Creative Art", name: "Creative Art" },
    // ];

    useEffect(() => {
        dispatch(getSkillsByName({ token }))
    }, [])

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#fff', // Background color for the control
            border: "none",
            boxShadow: 'none', // Remove the default shadow
            paddingLeft: "50px",
            '&:hover': {
                borderColor: '#80bdff', // Slightly darker border color on hover
            },
            '&:focus': {
                borderColor: '#80bdff', // Focus border color
                boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)', // Bootstrap's glow effect on focus
            },
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#e9ecef' : state.isSelected ? '#007bff' : null, // Highlight focused and selected options
            color: state.isFocused ? 'black' : 'black', // Text color
            padding: 10, // Padding to match Bootstrap's spacing
        }),

        singleValue: (provided) => ({
            ...provided,
            color: 'black', // Text color for the selected value
        }),

        menu: (provided) => ({
            ...provided,
            backgroundColor: '#fff', // Background color for the dropdown menu
            borderRadius: '0.25rem', // Rounded corners for the dropdown
            zIndex: "10",

        }),

        indicatorSeparator: () => ({
            display: 'none', // Hide the separator

        }),

        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#495057', // Arrow color

        }),

        clearIndicator: (provided) => ({
            ...provided,
            color: '#495057', // Clear "x" icon color

        }),

        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#007bff', // Background color for selected options
            color: 'white', // Text color for selected options
        }),

        multiValueLabel: (provided) => ({
            ...provided,
            color: 'white', // Text color for selected options
        }),

        multiValueRemove: (provided) => ({
            ...provided,
            color: 'white', // Remove "x" icon color
            ':hover': {
                backgroundColor: '#0069d9', // Darker background on hover
                color: 'white', // Text color on hover
            },
        }),
    };

    const skillsList = skillsByName?.map(specialism => ({
        value: specialism.id,
        label: specialism.name
    }));

    const handleInputSkill = (e) => {
        const skillName = e
        dispatch(getSkillsByName({ skillName, token }));
    };

    const handleChangeSkill = (selectedOption) => {
        dispatch(handleChangeFilters({ skillId: selectedOption }))
    };



    return (
        <>
            <Select
                value={filterBySkillId}
                onInputChange={handleInputSkill}
                onChange={(selectedOption) => handleChangeSkill(selectedOption)} // Assuming 'companyId' is the name of the field in formData
                options={skillsList}
                placeholder="Choose a Skill"
                isSearchable
                styles={customStyles}
            />
            {skillsByName ?
                <span className="icon flaticon-briefcase"></span>
                : (
                    <span
                        className="icon spinner-border spinner-border-sm mx-2"
                        style={{ width: '20px', height: '20px', marginTop: "-10px" }}
                        role="status"
                        aria-live="polite"
                    ></span>
                )}

        </>
    );
};

export default Skills;
