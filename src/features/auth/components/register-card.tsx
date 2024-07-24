"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export const RegisterCard = () => {
   const onProvider = (provider: "google" | "github") => {
      signIn(provider);
   };

   return (
      <Card className="w-full p-8">
         <CardHeader className="p-0">
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
               Create your account here or login to OAuth below!
            </CardDescription>
         </CardHeader>
         <CardContent className="mt-4">
            <div className="flex flex-col gap-y-2.5">
               <Button
                  onClick={() => onProvider("google")}
                  variant="outline"
                  size="lg"
                  className="w-full relative"
               >
                  <FcGoogle className="size-4 absolute top-3 left-8" />
                  <p>Continue with Google</p>
               </Button>
               <Button
                  onClick={() => onProvider("github")}
                  variant="outline"
                  size="lg"
                  className="w-full relative"
               >
                  <FaGithub className="size-4 absolute top-3 left-8" />
                  <p>Continue with Github</p>
               </Button>
               <p className="text-xs text-muted-foreground text-center">
                  Already have an account?&nbsp;
                  <span className="text-sky-700 hover:underline">
                     <Link href="/login">Login</Link>
                  </span>
               </p>
            </div>
         </CardContent>
      </Card>
   );
};
