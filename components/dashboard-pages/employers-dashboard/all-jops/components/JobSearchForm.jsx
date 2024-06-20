import Categories from "./Categories";
import JobSelect from "./JobSelect";
import LocationBox from "./LocationBox";
import SearchBox from "./SearchBox";

const JobSearchForm = () => {
    return (
        <>
            <div className="job-search-form">
                <div className="row">
                    <div className="form-group col-lg-4 col-md-12 col-sm-12">
                        <SearchBox />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
                        <LocationBox />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
                        <Categories />
                    </div>
                    {/* <!-- Form Group --> */}

                    <div className="form-group col-lg-2 col-md-12 col-sm-12 text-right">
                        <button
                            type="submit"
                            className="theme-btn btn-style-one"
                        >
                            Find Jobs
                        </button>
                    </div>
                    {/* <!-- Form Group --> */}
                </div>
            </div>

            <JobSelect />
        </>
    );
};

export default JobSearchForm;
