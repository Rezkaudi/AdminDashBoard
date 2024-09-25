import dynamic from "next/dynamic";
import AllJops from "@/components/dashboard-pages/employers-dashboard/all-jops";


export const metadata = {
  title: "Jobs List || BonZuttner",
  description: "BonZuttner",
};

const index = () => {
  return (
    <>
      <AllJops />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
