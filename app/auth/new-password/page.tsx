import { Suspense } from "react";
import { NewPasswordForm } from "@/components/auth/new-password-form";
import { AuthCard } from "@/components/auth/auth-card";

export default function NewPasswordPage() {
  return (
    <div className="flex items-center justify-center">
      <AuthCard
        title="Reset your password"
        description="Enter your new password"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <NewPasswordForm />
        </Suspense>
      </AuthCard>
    </div>
  );
}