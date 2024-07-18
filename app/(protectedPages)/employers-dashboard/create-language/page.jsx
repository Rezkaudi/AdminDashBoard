import dynamic from "next/dynamic";
import CreateLanguage from "@/components/dashboard-pages/employers-dashboard/create-language"

export const metadata = {
    title: "Company Profile || Superio - Job Borad React NextJS Template",
    description: "Superio - Job Borad React NextJS Template",
};

const index = () => {

    return (
        <CreateLanguage />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
