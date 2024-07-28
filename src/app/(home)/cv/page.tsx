"use client";

import { Button } from "@/components/ui/button";
import { useGetCvJson } from "@/features/home/api/use-get-cv-json";
import { Workspace } from "@/features/home/components/workspace";
import { AlertTriangleIcon, ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";

const CvPage = () => {
   const { data: initialData, isLoading, isError } = useGetCvJson();

   if (isLoading) {
      return (
         <div className="w-full h-screen flex flex-col justify-center items-center">
            <Loader className="size-10 text-sky-500 animate-spin transition" />
            <p className="text-xs text-muted-foreground font-semibold mt-2">Laoding...</p>
         </div>
      );
   }
   if (isError || !initialData) {
      return (
         <div className="w-full h-screen flex flex-col gap-y-4 justify-center items-center">
            <div className="flex flex-col items-center justify-center">
               <AlertTriangleIcon className="text-red-500 size-10" />
               <p className="text-sm text-muted-foreground">
                  Failed to load project
               </p>
            </div>
            <Button asChild variant="secondary" size="sm">
               <Link href="/">
                  <ArrowLeft className="size-4 mr-2" /> Back to Home
               </Link>
            </Button>
         </div>
      );
   }

   return <Workspace initialData={initialData} />;
};

export default CvPage;
