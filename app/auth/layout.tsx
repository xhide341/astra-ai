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
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-6">
        <div className="mb-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Aura" width={48} height={48} priority />
            <span className="text-xl font-semibold text-primary">Aura</span>
          </Link>
        </div>
        {children}
      </div>
    </main>
  );
}
