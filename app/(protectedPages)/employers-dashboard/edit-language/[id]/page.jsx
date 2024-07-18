import dynamic from "next/dynamic";
import EditLanguage from "@/components/dashboard-pages/employers-dashboard/edit-language"

export const metadata = {
    title: "Company Profile || Superio - Job Borad React NextJS Template",
    description: "Superio - Job Borad React NextJS Template",
};

const index = ({ params }) => {

    const id = params.id;
   
    return (
        <EditLanguage id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
