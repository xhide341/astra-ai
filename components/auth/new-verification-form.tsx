"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

export function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token!");
      return;
    }

    try {
      const data = await newVerification(token);
      setSuccess(data.success);
      setError(data.error);
    } catch (error) {
      console.error(error);
      setError("Something went wrong!");
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardDescription className="text-center text-lg">
          Confirming your verification
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {!success && !error && (
          <div className="flex flex-col items-center gap-2">
            <BeatLoader color="gray" />
            <p className="text-sm text-muted-foreground">
              Please wait while we verify your email...
            </p>
          </div>
        )}
        {success && (
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            <p className="text-sm text-muted-foreground">{success}</p>
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-destructive" />
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 