import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AuthCard } from "@/components/auth/auth-card";

const ResetPasswordPage = () => {
  return (
    <div className="flex items-center justify-center">
      <AuthCard
        title="Create an account"
        description="Enter your details to create your account"
      >
        <ResetPasswordForm />
      </AuthCard>
    </div>
  );
};

export default ResetPasswordPage;
