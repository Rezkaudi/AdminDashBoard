import dynamic from "next/dynamic";
import ManageJobs from "@/components/dashboard-pages/employers-dashboard/manage-jobs";

export const metadata = {
  title: "Companies list || BonZuttner",
  description: "BonZuttner",
};

const index = () => {
  return (
    <>
      <ManageJobs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
