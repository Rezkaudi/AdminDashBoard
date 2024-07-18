import dynamic from "next/dynamic";
import Skills from "@/components/dashboard-pages/employers-dashboard/skills";

export const metadata = {
  title: "Skills || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <Skills />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
