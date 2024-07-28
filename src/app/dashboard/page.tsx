import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils";
import { Banner } from "./_components/banner";
import { Separator } from "@/components/ui/separator";

const DashboardPage = async () => {
   await protectServer();
   const session = await auth();

   return (
      <div>
         <h1 className="underline mb-2 decoration-sky-900/30 decoration-2 ">Welcome back, <span className="font-semibold">{session?.user?.name}</span></h1>
         <Banner />
      </div>
   );
};

export default DashboardPage;
