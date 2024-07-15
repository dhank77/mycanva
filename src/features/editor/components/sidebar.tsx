"use client";

import { BrainIcon, ImageIcon, LayoutTemplateIcon, SettingsIcon, ShapesIcon, TypeIcon } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export const Sidebar = () => {
   return (
      <aside className="h-full w-[100px] border-r overflow-y-auto bg-white">
         <ul className="flex flex-col">
            <SidebarItem
               label="Design"
               icon={LayoutTemplateIcon}
               onClick={() => {}}
               isActive={true}
            />
            <SidebarItem
               label="Image"
               icon={ImageIcon}
               onClick={() => {}}
               isActive={false}
            />
            <SidebarItem
               label="Text"
               icon={TypeIcon}
               onClick={() => {}}
               isActive={false}
            />
            <SidebarItem
               label="Shapes"
               icon={ShapesIcon}
               onClick={() => {}}
               isActive={false}
            />
            <SidebarItem
               label="AI"
               icon={BrainIcon}
               onClick={() => {}}
               isActive={false}
            />
            <SidebarItem
               label="Settings"
               icon={SettingsIcon}
               onClick={() => {}}
               isActive={false}
            />
         </ul>
      </aside>
   );
};
