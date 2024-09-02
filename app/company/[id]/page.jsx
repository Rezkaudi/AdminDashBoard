import dynamic from "next/dynamic";
import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile";

export const metadata = {
    title: "Company Profile || BonZuttner",
    description: "BonZuttner",
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
