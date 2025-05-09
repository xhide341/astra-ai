"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { registerSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { useTransition, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { SocialLoginButtons } from "./social-login-buttons";

interface RegisterFormProps {
  onToggleView: () => void;
}

export const RegisterForm = ({ onToggleView }: RegisterFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError("");
    setSuccess("");
    
    startTransition(async () => {
      const response = await register(values);
      
      if (response.error) {
        const fieldErrors = response.error;
        for (const [field, messages] of Object.entries(fieldErrors)) {
          form.setError(field as keyof typeof values, {
            message: messages?.[0]
          });
        }
      }
      
      if (response.success) {
        form.reset();
        setSuccess(response.success);
        setTimeout(() => {
          onToggleView();
        }, 2000);
      }
    });
  }

  return (
    <div className="px-4 py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="name">Name</Label>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    placeholder="John Doe"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

          <div className="space-y-2">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>

          <Button className="w-full bg-primary-color text-white/90 transition-all hover:bg-secondary-color" type="submit" disabled={isPending}>
            Create account
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
            <button
              type="button"
              onClick={onToggleView}
              className="text-primary hover:underline"
            >
              Already have an account?
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
