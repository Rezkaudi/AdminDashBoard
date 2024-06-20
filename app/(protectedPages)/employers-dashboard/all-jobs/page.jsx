import dynamic from "next/dynamic";
import AllJops from "@/components/dashboard-pages/employers-dashboard/all-jops";


export const metadata = {
  title: "Post Jobs || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <AllJops />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
