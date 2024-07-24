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

export const LoginCard = () => {
   const onProvider = (provider: "google" | "github") => {
      signIn(provider);
   };

   return (
      <Card className="w-full p-8">
         <CardHeader className="p-0">
            <CardTitle>Login to Continune</CardTitle>
            <CardDescription>
               Use your email or another service to Continune
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
                  Dont have an account?&nbsp;
                  <span className="text-sky-700 hover:underline">
                     <Link href="/register">Register</Link>
                  </span>
               </p>
            </div>
         </CardContent>
      </Card>
   );
};
