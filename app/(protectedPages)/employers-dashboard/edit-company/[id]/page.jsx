import dynamic from "next/dynamic";
import EditCompany from "@/components/dashboard-pages/employers-dashboard/edit-company"

export const metadata = {
    title: "Company Profile || Superio - Job Borad React NextJS Template",
    description: "Superio - Job Borad React NextJS Template",
};

const index = ({ params }) => {

    const id = params.id;
   
    return (
        <EditCompany id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
