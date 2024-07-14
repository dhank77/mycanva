import { Logo } from "./logo";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Hint } from "@/components/hint";

import { ChevronDown, Download, MousePointerClick, Redo2, Undo2 } from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { BsCloudCheck } from "react-icons/bs";
import { VscJson } from "react-icons/vsc";
import { TbJpg, TbPng, TbSvg } from "react-icons/tb";

export const Navbar = () => {
   return (
      <nav className="h-[68px] w-full flex items-center p-4 gap-x-8 border-b lg:pl-[34px]">
         <Logo />
         <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" size="sm">
                  File
                  <ChevronDown className="ml-2 size-4" />
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-60">
               <DropdownMenuItem
                  onClick={() => {}}
                  className="flex items-center gap-x-2"
               >
                  <CiFileOn className="size-8" />
                  <div>
                     <p>Open</p>
                     <p className="text-xs text-muted-foreground">
                        Open file JSON
                     </p>
                  </div>
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
         <Separator orientation="vertical" className="mx-2" />
         <Hint label="Select" side="bottom" sideOffset={10}>
            <Button size="icon" variant="ghost">
               <MousePointerClick className="size-4" />
            </Button>
         </Hint>
         <Hint label="Undo" side="bottom" sideOffset={10}>
            <Button size="icon" variant="ghost">
               <Undo2 className="size-4" />
            </Button>
         </Hint>
         <Hint label="Redo" side="bottom" sideOffset={10}>
            <Button size="icon" variant="ghost">
               <Redo2 className="size-4" />
            </Button>
         </Hint>
         <Separator orientation="vertical" className="mx-2" />
         <div className="flex items-center gap-x-2">
            <BsCloudCheck className="size-[20px] text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Saved</p>
         </div>
         <div className="ml-auto flex items-center gap-x-2">
            <div>
               <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" size="sm">
                     Export
                        <Download className="ml-2 size-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-60">
                     <DropdownMenuItem
                        onClick={() => {}}
                        className="flex items-center gap-x-2"
                     >
                        <VscJson className="size-8" />
                        <div>
                           <p>Json</p>
                           <p className="text-xs text-muted-foreground">
                              Save file JSON
                           </p>
                        </div>
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => {}}
                        className="flex items-center gap-x-2"
                     >
                        <TbPng className="size-8" />
                        <div>
                           <p>PNG</p>
                           <p className="text-xs text-muted-foreground">
                              Save PNG file
                           </p>
                        </div>
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => {}}
                        className="flex items-center gap-x-2"
                     >
                        <TbJpg className="size-8" />
                        <div>
                           <p>JPG</p>
                           <p className="text-xs text-muted-foreground">
                              Save JPG file
                           </p>
                        </div>
                     </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => {}}
                        className="flex items-center gap-x-2"
                     >
                        <TbSvg className="size-8" />
                        <div>
                           <p>SVG</p>
                           <p className="text-xs text-muted-foreground">
                              Save SVG file
                           </p>
                        </div>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </nav>
   );
};
