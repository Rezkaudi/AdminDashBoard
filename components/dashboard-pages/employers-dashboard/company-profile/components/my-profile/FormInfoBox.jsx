
'use client'

import Select from "react-select";
import { useSelector } from "react-redux";

const FormInfoBox = () => {
    const { findCompany } = useSelector(state => state.companies)

    const catOptions = [
        { value: "Banking", label: "Banking" },
        { value: "Digital & Creative", label: "Digital & Creative" },
        { value: "Retail", label: "Retail" },
        { value: "Human Resources", label: "Human Resources" },
        { value: "Managemnet", label: "Managemnet" },
        { value: "Accounting & Finance", label: "Accounting & Finance" },
        { value: "Digital", label: "Digital" },
        { value: "Creative Art", label: "Creative Art" },
    ];

    return (
        <form className="default-form">
            <div className="row">
                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Company name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Invisionn"
                        required
                        value={findCompany.name}
                        disabled
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Email address</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="ib-themes"
                        required
                        value={findCompany.email}
                        disabled
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Address</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="0 123 456 7890"
                        required
                        value={findCompany.address}
                        disabled
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Join Date</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="www.invision.com"
                        required
                        value={findCompany.joinDate}
                        disabled
                    />
                </div>

                {/* <!-- About Company --> */}
                <div className="form-group col-lg-12 col-md-12">
                    <label>About Company</label>
                    {/* <textarea 
                    placeholder="Spent several years working on sheep on Wall Street. Had moderate success investing in Yugo's on Wall Street. Managed a small team buying and selling Pogo sticks for farmers. Spent several years licensing licorice in West Palm Beach, FL. Developed several new methods for working it banjos in the aftermarket. Spent a weekend importing banjos in West Palm Beach, FL.In this position, the Software Engineer collaborates with Evention's Development team to continuously enhance our current software solutions as well as create new solutions to eliminate the back-office operations and management challenges present"
                    value={null}
                    disabled
                    ></textarea> */}
                </div>
            </div>
        </form>
    );
};

export default FormInfoBox;
