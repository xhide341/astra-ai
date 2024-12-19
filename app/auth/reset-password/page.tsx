import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AuthCard } from "@/components/auth/auth-card";

const ResetPasswordPage = () => {
  return (
    <div className="flex items-center justify-center">
      <AuthCard
        title="Enter your email"
        description="Enter your email to reset your password"
      >
        <ResetPasswordForm />
      </AuthCard>
    </div>
  );
};

export default ResetPasswordPage;
