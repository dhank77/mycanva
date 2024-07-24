import { LoginCard } from "@/features/auth/components/login-card";
import { redirectToHome } from "@/features/auth/utils";

const LoginPage = async () => {
   await redirectToHome();
   
   return <LoginCard />;
};

export default LoginPage;
