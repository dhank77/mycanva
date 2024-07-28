import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
   BriefcaseBusinessIcon,
   DownloadIcon,
   HomeIcon,
   NewspaperIcon,
   NotepadTextIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export const BottomMenu = () => {
   return (
      <div className="fixed bottom-0 left-1/2 z-20 mx-auto py-2 px-4 mb-4 rounded-xl bg-slate-200 dark:bg-sky-900 space-x-4" style={{ transform: 'translateX(-50%) translateY(0px) translateZ(0px)' }}>
         <div className="flex items-center justify-center gap-3">
            <Hint side="top" label="Home">
               <Button
                  size="icon"
                  variant="outline"
                  className="bg-blue-300 dark:bg-gray-300 border-none"
                  asChild
               >
                  <Link href="/">
                     <HomeIcon className="size-6" />
                  </Link>
               </Button>
            </Hint>
            <Hint side="top" label="My CV">
               <Button
                  size="icon"
                  variant="outline"
                  className="bg-blue-300 dark:bg-gray-300 border-none"
                  asChild
               >
                  <Link href="/cv">
                     <NewspaperIcon className="size-6" />
                  </Link>
               </Button>
            </Hint>
            <Hint side="top" label="Download CV">
               <Button
                  size="icon"
                  variant="outline"
                  className="bg-blue-300 dark:bg-gray-300 border-none"
                  asChild
               >
                  <Link href="/mycv-e3295981-ca75-44d2-9e8f-a60c5a9b9ead.pdf">
                     <DownloadIcon className="size-6" />
                  </Link>
               </Button>
            </Hint>
            <Hint side="top" label="My Experience">
               <Button
                  size="icon"
                  variant="outline"
                  className="bg-blue-300 dark:bg-gray-300 border-none"
               >
                  <NotepadTextIcon className="size-6" />
               </Button>
            </Hint>
            <Hint side="top" label="My Project">
               <Button
                  size="icon"
                  variant="outline"
                  className="bg-blue-300 dark:bg-gray-300 border-none"
               >
                  <BriefcaseBusinessIcon className="size-6" />
               </Button>
            </Hint>
         </div>
      </div>
   );
};
