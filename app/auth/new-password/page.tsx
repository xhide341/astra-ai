import { Suspense } from "react";
import { NewPasswordForm } from "@/components/auth/new-password-form";

export default function NewPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-[425px] p-6">
        <div className="mb-6 text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset your password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <NewPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}