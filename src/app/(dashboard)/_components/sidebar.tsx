"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/features/editor/components/logo";
import { Crown } from "lucide-react";

export const Sidebar = () => {
   return (
      <aside className="hidden lg:flex flex-col h-full w-[320px] fixed left-0 shrink-0 p-4 gap-y-4">
         <Logo>
            <h1 className="font-bold text-xl text-sky-900">MyCanva</h1>
         </Logo>
         <Button
            onClick={() => {}}
            variant="outline"
            className="w-full rounded-lg border-none hover:bg-white"
         >
            <Crown className="size-4 mr-2 fill-yellow-500 text-yellow-500" />
            Upgrade to MyCanva Pro
         </Button>
         <div className="my-2">
            <Separator />
         </div>
      </aside>
   );
};
