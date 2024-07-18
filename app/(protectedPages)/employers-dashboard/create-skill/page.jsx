import dynamic from "next/dynamic";
import CreateSkill from "@/components/dashboard-pages/employers-dashboard/create-skill"

export const metadata = {
    title: "Company Profile || Superio - Job Borad React NextJS Template",
    description: "Superio - Job Borad React NextJS Template",
};

const index = () => {

    return (
        <CreateSkill />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
