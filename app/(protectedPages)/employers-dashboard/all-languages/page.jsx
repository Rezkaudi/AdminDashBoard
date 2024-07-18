import dynamic from "next/dynamic";
import Languages from "@/components/dashboard-pages/employers-dashboard/languages";

export const metadata = {
  title: "Languages || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <Languages />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
