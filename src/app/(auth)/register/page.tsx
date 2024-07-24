import { RegisterCard } from "@/features/auth/components/register-card";
import { redirectToHome } from "@/features/auth/utils";

const RegisterPage = async () => {
   await redirectToHome();
   
   return <RegisterCard />;
};

export default RegisterPage;
