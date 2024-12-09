import { ErrorCard } from "@/components/auth/error-card";
import { AlertCircle } from 'lucide-react'

const AuthErrorPage = async ({
  searchParams,
}: {
  searchParams: { error: string | null };
}) => {
  const error = await searchParams.error;

  const errorMessages: { [key: string]: string } = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link has expired or already been used.",
    Default: "Error occurred. Please try again later.",
  };

  const message = error ? errorMessages[error] : errorMessages.Default;

  return (
    <div className="flex items-center justify-center">
      <ErrorCard
        title="Authentication Error"
        message={message}
      >
        {error && (
          <div className="flex items-center justify-center space-x-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>Error code: {error}</span>
          </div>
        )}
      </ErrorCard>
    </div>
  );
}

export default AuthErrorPage;
