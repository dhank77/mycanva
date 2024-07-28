import { BottomMenu } from "@/features/home/components/bottom-menu";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div>
         <div className="relative">{children}</div>
         <BottomMenu />
      </div>
   );
};

export default HomeLayout;
