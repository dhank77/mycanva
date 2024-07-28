import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const protectServer = async () => {
   const session = await auth();

   if (!session) {
      redirect("/login");
   }
};

export const redirectToHome = async () => {
   const session = await auth();

   if(session){
      redirect("/dashboard");
   }
}