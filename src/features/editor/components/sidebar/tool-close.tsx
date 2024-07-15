import { ChevronsLeft } from "lucide-react";

export const ToolClose = ({ onClick }: { onClick: () => void }) => {
  return (
    <button 
        onClick={onClick}
        className="absolute -right-[20px] h-[70px] top-1/2 rounded-r-xl p-2 border-r bg-white group transform"
    >
      <ChevronsLeft className="size-4 text-black group-hover:opacity-50 transition" />
    </button>
  );
};
