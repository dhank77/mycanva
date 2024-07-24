const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="bg-[url(/bg.jpg)] bg-bottom bg-cover h-full flex flex-col">
         <div className="z-[4] h-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-white">MyCanva</h1>
            <div className=" w-full h-auto p-4 md:max-w-[420px] ">
               {children}
            </div>
         </div>
         <div className="z-[1] fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.4),rgba(0,0,0,0.8))]" />
      </div>
   );
};

export default AuthLayout;
