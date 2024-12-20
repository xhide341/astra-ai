"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "@/schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { Loader2 } from "lucide-react";
import { useTransition, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" 
    ? "Email already linked to another provider" 
    : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>(urlError || "");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
      remember: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");
    
    try {
      startTransition(async () => {
        try {
          console.log("Submitting form with values:", {
            ...values,
            password: "REDACTED" // Don't log passwords
          });

          const response = await login(values);
          console.log("Login response:", response);
          
          if (response.error) {
            if (response.error._form) {
              setError(response.error._form[0]);
              return;
            }
            // Handle field errors
            for (const [field, messages] of Object.entries(response.error)) {
              form.setError(field as keyof typeof values, {
                message: messages?.[0]
              });
            }
            return;
          }

          if (response.twoFactor) {
            setShowTwoFactor(true);
            setSuccess("Check your email for a two-factor code.");
            return;
          }
          
          if (response.success) {
            form.reset();
            setSuccess(response.success);
          }
        } catch (error) {
          console.error("Error during login:", error);
          setError("An unexpected error occurred");
        }
      });
    } catch (error) {
      console.error("Error starting transition:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {showTwoFactor && (
          <>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="code">Two-Factor Code</Label>
                    <FormControl>
                      <Input
                        {...field}
                        id="code"
                        placeholder="123456"
                        disabled={isPending}
                        maxLength={6}
                        type="text"
                        autoComplete="one-time-code"
                        className="text-center text-lg tracking-widest"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm text-muted-foreground text-center space-y-2">
                <p>Enter the 6-digit code sent to your email</p>
                <button
                  type="button"
                  onClick={() => {
                    setShowTwoFactor(false);
                    form.reset({ 
                      email: form.getValues("email"),
                      password: form.getValues("password"),
                      remember: form.getValues("remember")
                    });
                  }}
                  className="underline hover:text-primary transition-colors"
                >
                  Back to login
                </button>
              </div>
            </div>
          </>
        )}

        {!showTwoFactor && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input
                      {...field}                  
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      disabled={isPending}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Password</Label>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      disabled={isPending}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                    <Label 
                      htmlFor="remember" 
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </Label>
                  </FormItem>
                )}
              />
              <Link
                href="/auth/reset-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </>
        )}

        <div className="space-y-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : showTwoFactor ? (
            "Verify Code"
          ) : (
            "Sign in"
          )}
        </Button>

        {!showTwoFactor && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <SocialLoginButtons />
            </div>

            <div className="text-center text-sm">
              <Link 
                className="text-primary hover:underline"
                href="/auth/register"
              >
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}

