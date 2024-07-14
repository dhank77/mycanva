import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
    children: React.ReactNode,
    label: string,
    side: "top" | "bottom" | "left" | "right",
    sideOffset?: number,
    align?: "center" | "start" | "end",
    alignOffset?: number,
}

export const Hint = ({
   children,
   label,
   side,
   sideOffset,
   align,
   alignOffset,
} :  HintProps) => {
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent
                className="text-white bg-slate-800 border-slate-800"
                side={side}
                sideOffset={sideOffset}
                align={align}
                alignOffset={alignOffset}
            >
               <p>{label}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};
