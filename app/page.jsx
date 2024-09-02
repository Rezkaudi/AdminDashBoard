import Wrapper from "@/layout/Wrapper";
import DashboadHome from "@/components/dashboard-pages/employers-dashboard/dashboard";


export const metadata = {
  title: "Dashboard || Bonzuttner",
  description: "Bonzuttner",
};

export default function page() {

  return (
    <Wrapper>
      <DashboadHome />
    </Wrapper>
  );
}


