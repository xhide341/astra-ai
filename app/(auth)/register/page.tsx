import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center">
      <AuthCard
        title="Create an account"
        description="Enter your details to create your account"
      >
        <RegisterForm />
      </AuthCard>
    </div>
  );
};

export default RegisterPage;
