import dynamic from "next/dynamic";
import EditJop from "@/components/dashboard-pages/employers-dashboard/edit-jop"

export const metadata = {
    title: "Edit Job || BonZuttner",
    description: "BonZuttner",
};

const index = ({ params }) => {

    const id = params.id;
   
    return (
        <EditJop id={id} />
    );
};

export default dynamic(() => Promise.resolve(index), {
    ssr: false,
});
