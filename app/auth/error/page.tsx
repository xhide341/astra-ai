import { ErrorCard } from "@/components/auth/error-card";
import { AlertCircle } from "lucide-react";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AuthErrorPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  const error = params.error;

  const errorMessages = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link has expired or already been used.",
    Default: "Error occurred. Please try again later.",
  } as const;

  const message = error ? errorMessages[error as keyof typeof errorMessages] : errorMessages.Default;

  return (
    <div className="flex items-center justify-center">
      <ErrorCard
        title="Authentication Error"
        message={message}
      >
        {error && (
          <div className="flex items-center justify-center space-x-2 text-destructive">
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
            <span>Error code: {error}</span>
          </div>
        )}
      </ErrorCard>
    </div>
  );
}
