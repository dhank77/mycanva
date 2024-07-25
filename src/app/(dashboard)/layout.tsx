import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
   return (
    <div className="bg-muted h-full">
        <Sidebar />
        <div className="lg:pl-[320px] flex flex-col h-full">
            <Navbar />
            <main className="bg-white h-full p-8 lg:rounded-tl-2xl">
                {children}
            </main>
        </div>
    </div>
   );
};

export default LayoutDashboard;
