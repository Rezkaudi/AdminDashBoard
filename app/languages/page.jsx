import dynamic from "next/dynamic";
import Languages from "@/components/dashboard-pages/employers-dashboard/languages";

export const metadata = {
  title: "Languages List || BonZuttner",
  description: "BonZuttner",
};

const index = () => {
  return (
    <>
      <Languages />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
