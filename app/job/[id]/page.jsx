import dynamic from "next/dynamic";
import Jop from "@/components/dashboard-pages/employers-dashboard/jop"


export const metadata = {
  title: "Job || BonZuttner",
  description: "BonZuttner",
};

const JobSingleDynamicV2 = ({ params }) => {
  const id = params.id;

  return (
    <Jop id={id} />
  );
};

export default dynamic(() => Promise.resolve(JobSingleDynamicV2), {
  ssr: false,
});
