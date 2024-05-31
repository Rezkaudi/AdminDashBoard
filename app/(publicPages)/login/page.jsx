
import dynamic from "next/dynamic";
import { redirect} from "next/navigation";
import { getAuthStatus } from "@/utils/authStatus";
import LogIn from "@/components/pages-menu/login";


export const metadata = {
  title: 'Login || Superio - Job Borad React NextJS Template',
  description:
    'Superio - Job Borad React NextJS Template',
}

const index = () => {

  const isLoggedIn = getAuthStatus()

  if (isLoggedIn) {
    redirect("/employers-dashboard/dashboard")
  }

  return (
    <>
      <LogIn/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
