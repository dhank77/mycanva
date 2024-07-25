import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";

export const UserButton = () => {
  const user = useSession();
  const name = user.data?.user?.name!;
  const imageSrc = user.data?.user?.image!;
  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage alt={name} src={imageSrc} />
            <AvatarFallback className="font-bold bg-blue-500/20">
              {name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuItem
            onClick={() => {}}
            className="flex items-center gap-x-2"
          >
            <CreditCard className="size-6" />
            <p>Billing</p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-x-2"
          >
            <LogOutIcon className="size-6" />
            <p>Logout</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
