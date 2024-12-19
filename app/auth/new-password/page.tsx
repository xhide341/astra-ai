import { NewPasswordForm } from "@/components/auth/new-password-form";
import { AuthCard } from "@/components/auth/auth-card";

const NewPasswordPage = () => {
  return (
    <div className="flex items-center justify-center">
      <AuthCard
        title="Reset your password"
        description="Enter your new password"
      >
        <NewPasswordForm />
      </AuthCard>
    </div>
  );
};

export default NewPasswordPage;