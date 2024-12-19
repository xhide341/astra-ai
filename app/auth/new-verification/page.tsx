import { Suspense } from "react";
import { VerificationForm } from "@/app/auth/new-verification/verification-form";
import { BeatLoader } from "react-spinners";

export default function NewVerificationPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-lg px-4">
        <Suspense 
          fallback={
            <div className="flex justify-center">
              <BeatLoader color="gray" />
            </div>
          }
        >
          <VerificationForm />
        </Suspense>
      </div>
    </div>
  );
}
