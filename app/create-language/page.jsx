import dynamic from "next/dynamic";
import CreateLanguage from "@/components/dashboard-pages/employers-dashboard/create-language"

export const metadata = {
    title: "Create Language || BonZuttner",
    description: "BonZuttner",
};

const index = () => {

    return (
        <CreateLanguage />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
