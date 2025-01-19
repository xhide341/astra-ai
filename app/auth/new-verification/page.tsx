import { Suspense } from "react";
import { NewVerificationForm } from "@/components/auth/new-verification-form";

export default function NewVerificationPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Email Verification</h1>
          <p className="text-muted-foreground">Confirming your verification</p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <NewVerificationForm />
        </Suspense>
      </div>
    </div>
  );
}