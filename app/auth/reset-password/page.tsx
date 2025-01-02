import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AuthCard } from "@/components/auth/auth-card";

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center">
      <AuthCard
        title="Enter your email"
        description="Enter your email to reset your password"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </AuthCard>
    </div>
  );
}
