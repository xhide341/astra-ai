"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { newPasswordSchema } from "@/schemas";
import { newPassword } from "@/actions/new-password";
import { useTransition, useState } from "react";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

export const NewPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    setError("");
    setSuccess("");

    console.log(values);
    
    startTransition(async () => {
      const response = await newPassword(values);
      
      if (response.error) {
        setError(response.error);
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="password">Password</Label>
              <FormControl>
                <Input
                  {...field}                  
                  id="password"
                  type="password"
                  placeholder="Enter your new password"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <FormControl>
                <Input
                  {...field}                  
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        
        <Button 
          className="w-full" 
          type="submit" 
          disabled={isPending}
        >
          Reset Password
        </Button>

        <div className="flex justify-center">
          <Link 
            href="/auth/login" 
            className="text-sm text-muted-foreground hover:underline"
          >
            Back to login
          </Link>
        </div>

      </form>
    </Form>
  );
}

