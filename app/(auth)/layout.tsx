import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authentication - Aura",
  description: "Login or register for Aura - Your AI-powered learning companion",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen">
      {/* Left side - Auth Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Aura" width={48} height={48} priority />
              <span className="text-xl font-semibold text-highlight">Aura</span>
            </Link>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Image/Gradient Background */}
      <div className="hidden lg:block relative w-1/2">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-xl text-center">
            <h1 className="text-4xl font-bold text-highlight mb-4">
              Welcome to Aura
            </h1>
            <p className="text-gray-300">
              Your intelligent study companion that adapts to your learning style
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
