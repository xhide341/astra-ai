import { Suspense } from "react";
import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { AuthCard } from "@/components/auth/auth-card";

export default function NewVerificationPage() {
  return (
    <div className="flex items-center justify-center">
      <AuthCard
        title="Email Verification"
        description="Confirming your verification"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <NewVerificationForm />
        </Suspense>
      </AuthCard>
    </div>
  );
}