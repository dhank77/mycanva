import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils";

const DashboardPage = async () => {
   await protectServer();

   const session = await auth();
   return <div>{JSON.stringify(session)}</div>;
};

export default DashboardPage;
