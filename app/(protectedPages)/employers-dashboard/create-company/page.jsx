import dynamic from "next/dynamic";
import CreateCompany from "@/components/dashboard-pages/employers-dashboard/create-company"

export const metadata = {
    title: "Company Profile || Superio - Job Borad React NextJS Template",
    description: "Superio - Job Borad React NextJS Template",
};

const index = () => {

    return (
        <CreateCompany />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
