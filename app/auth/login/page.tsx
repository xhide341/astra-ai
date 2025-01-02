import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { AuthCard } from "@/components/auth/auth-card";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center">
      <AuthCard
        title="Welcome back"
        description="Enter your credentials to access your account"
      >
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </AuthCard>
    </div>
  );
};

export default LoginPage;
