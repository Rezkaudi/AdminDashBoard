import dynamic from "next/dynamic";
import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile";

export const metadata = {
    title: "Company Profile || Superio - Job Borad React NextJS Template",
    description: "Superio - Job Borad React NextJS Template",
};

const JobSingleDynamicV1 = ({ params }) => {

    const id = params.id;
   
    return (
        <CompanyProfile id={id} />
    );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV1), {
    ssr: false,
});
