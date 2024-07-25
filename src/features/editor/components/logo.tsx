import Image from "next/image";
import Link from "next/link";

export const Logo = ({
   children,
}: {
   children?: React.ReactNode | undefined;
}) => {
   return (
      <Link href="/" className="flex items-center hover:opacity-70 transition">
         <div className="size-8 shrink-0 relative">
            <Image
               src="/logo.svg"
               alt="logo"
               fill
               className="shrink-0"
            />
         </div>
         {children && <div className="ml-2">{children}</div>}
      </Link>
   );
};
