import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils";
import { Banner } from "./_components/banner";

const DashboardPage = async () => {
   await protectServer();
   const session = await auth();

   return (
      <div>
         <h1>Welcome back, <span className="font-semibold">{session?.user?.name}</span></h1>
         <Banner />
      </div>
   );
};

export default DashboardPage;
