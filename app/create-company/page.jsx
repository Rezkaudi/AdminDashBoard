import dynamic from "next/dynamic";
import CreateCompany from "@/components/dashboard-pages/employers-dashboard/create-company"

export const metadata = {
    title: "Create Company  || BonZuttner",
    description: "BonZuttner",
};

const index = () => {

    return (
        <CreateCompany />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
