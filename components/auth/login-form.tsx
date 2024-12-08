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

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");
    setSuccess("");
    
    startTransition(async () => {
      const response = await login(values);
      
      if (response.error) {
        // Handle field-specific errors through react-hook-form
        const fieldErrors = response.error;
        
        // Add this to handle _form errors
        if (fieldErrors._form) {
          setError(fieldErrors._form[0]);
          return;
        }

        // Handle other field errors
        for (const [field, messages] of Object.entries(fieldErrors)) {
          form.setError(field as keyof typeof values, {
            message: messages?.[0]
          });
        }
      }
      
      if (response.success) {
        setSuccess(response.success);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            href="/auth/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="space-y-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        
        <Button className="w-full" type="submit" disabled={isPending}>
          Sign in
        </Button>

        <div className="relative mt-6">
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

        <div className="mt-4 text-center text-sm">
          <Link 
            className="text-primary hover:underline"
            href="/auth/register"
          >
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}

