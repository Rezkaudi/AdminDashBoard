import dynamic from "next/dynamic";
import CreateSkill from "@/components/dashboard-pages/employers-dashboard/create-skill"

export const metadata = {
    title: "Create Skill || BonZuttner",
    description: "BonZuttner",
};

const index = () => {

    return (
        <CreateSkill />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
