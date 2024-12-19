"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { resetPasswordSchema } from "@/schemas";
import { resetPassword } from "@/actions/reset-password";
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


export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setError("");
    setSuccess("");

    console.log(values);
    
    startTransition(async () => {
      const response = await resetPassword(values);
      
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

        <div className="space-y-2">
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        
        <Button className="w-full" type="submit" disabled={isPending}>
          Reset Password
        </Button>

      </form>
    </Form>
  );
}

