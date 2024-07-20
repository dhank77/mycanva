"use client";

import { BrainIcon, ImageIcon, LayoutTemplateIcon, PencilIcon, SettingsIcon, ShapesIcon, TypeIcon } from "lucide-react";
import { SidebarItem } from "./sidebar/sidebar-item";
import { ActiveToolProps } from "@/lib/props";

export const Sidebar = ({
   activeTool,
   setActiveTool,
}: ActiveToolProps) => {
   return (
      <aside className="h-full w-[100px] border-r overflow-y-auto bg-white">
         <ul className="flex flex-col">
            <SidebarItem
               label="Design"
               icon={LayoutTemplateIcon}
               onClick={() => setActiveTool("design")}
               isActive={activeTool === "design"}
            />
            <SidebarItem
               label="Image"
               icon={ImageIcon}
               onClick={() => setActiveTool("image")}
               isActive={activeTool === "image"}
            />
            <SidebarItem
               label="Text"
               icon={TypeIcon}
               onClick={() => setActiveTool("text")}
               isActive={activeTool === "text"}
            />
            <SidebarItem
               label="Shapes"
               icon={ShapesIcon}
               onClick={() => setActiveTool("shapes")}
               isActive={activeTool === "shapes"}
            />
            <SidebarItem
               label="Draw"
               icon={PencilIcon}
               onClick={() => setActiveTool("draw")}
               isActive={activeTool === "draw"}
            />
            <SidebarItem
               label="AI"
               icon={BrainIcon}
               onClick={() => setActiveTool("ai")}
               isActive={activeTool === "ai"}
            />
            <SidebarItem
               label="Settings"
               icon={SettingsIcon}
               onClick={() => setActiveTool("settings")}
               isActive={activeTool === "settings"}
            />
         </ul>
      </aside>
   );
};
