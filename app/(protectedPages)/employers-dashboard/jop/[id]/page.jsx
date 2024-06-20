import dynamic from "next/dynamic";
import Jop from "@/components/dashboard-pages/employers-dashboard/jop"


export const metadata = {
  title: "Job Single Dyanmic V2 || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
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
