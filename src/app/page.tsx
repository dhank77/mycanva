import { protectServer } from "@/features/auth/utils";

const Page = async () => {
   await protectServer();

   return <div>Home Page!</div>;
};

export default Page;
