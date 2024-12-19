import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { AuthCard } from "@/components/auth/auth-card";

const NewVerificationPage = () => {
  return (
    <div className="flex items-center justify-center">
      <AuthCard
        title="Email Verification"
        description="Confirming your verification"
      >
        <NewVerificationForm />
      </AuthCard>
    </div>
  );
};

export default NewVerificationPage;