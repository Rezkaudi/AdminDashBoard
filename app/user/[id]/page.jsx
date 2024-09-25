import dynamic from "next/dynamic";
import ApplicantProfile from "@/components/dashboard-pages/employers-dashboard/applicant-profile";

export const metadata = {
    title:"User Profile || Bonzuttner",
    description: "Bonzuttner",
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
