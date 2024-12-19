import { Suspense } from "react";
import { NewVerificationForm } from "@/components/auth/new-verification-form";
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
          <NewVerificationForm />
        </Suspense>
      </div>
    </div>
  );
}
