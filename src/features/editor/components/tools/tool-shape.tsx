import { ToolShapeProps } from "@/lib/props";
import { cn } from "@/lib/utils";

export const ToolShape = ({
  onClick,
  icon: Icon,
  iconClassName,
}: ToolShapeProps) => {
  return (
    <button 
        onClick={onClick}
        className="aspect-square border rounded-md p-5"
    >
        <Icon className={cn("w-full h-full", iconClassName)} />
    </button>
  );
};
