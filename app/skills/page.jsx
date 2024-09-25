import dynamic from "next/dynamic";
import Skills from "@/components/dashboard-pages/employers-dashboard/skills";

export const metadata = {
  title: "Skills List|| Bonzuttner",
  description: "Bonzuttner",
};

const index = () => {
  return (
    <>
      <Skills />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
