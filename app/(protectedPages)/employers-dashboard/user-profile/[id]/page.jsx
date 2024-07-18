import dynamic from "next/dynamic";
import ApplicantProfile from "@/components/dashboard-pages/employers-dashboard/applicant-profile";

export const metadata = {
    title:
        "Candidate Single Dyanmic V1 || Superio - Job Borad React NextJS Template",
    description: "Superio - Job Borad React NextJS Template",
};

const index = ({ params }) => {
    const id = params.id;


    return (
        <ApplicantProfile id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
