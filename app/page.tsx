'use client';

import { useState } from "react";
import Image from 'next/image';
import AstraAILogo from "/components/icons/astra-ai-clear.png";
import { AuthModal } from "@/components/auth/auth-modal";
import { Button } from "@/components/ui/button";
import { Sparkles } from "@/components/ui/sparkles";
import DynamicTagline from "@/components/ui/dynamic-tagline";

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const handleAuthClick = (view: 'login' | 'register') => {
    setAuthView(view);
    setShowAuthModal(true);
  };

  return (
    <div className="flex flex-col font-poppins w-full relative min-h-screen overflow-clip bg-zinc-900">
      <main className="flex flex-1 flex-col items-center justify-between w-full px-6 lg:px-8 select-none">
        <section className="flex flex-col items-center w-full mx-auto pt-20 flex-1">
          <Image 
            src={AstraAILogo} 
            alt="Astra AI Logo"
            width={200}
            height={200}
          />
          <h1 className="text-5xl/[1.25] sm:text-6xl/[1.25] font-bold text-white/90 mb-6">
            ASTRA AI
          </h1>
          <h2 className="text-3xl/[1.25] sm:text-4xl/[1.25] mb-4 font-bold text-white/80 max-w-2xl leading-normal">
            Just enter a topic and...
          </h2>
          <DynamicTagline 
            taglines={[
              "🤖 let two AI minds discuss it in depth.",
              "💭 watch as AI agents debate and explore ideas.",
              "✨ experience dynamic AI-powered conversations.",
              "🔍 discover new perspectives through AI dialogue."
            ]}
            className="text-md text-white/80 max-w-[500px] mb-6"
          />
          <div className="flex flex-row justify-center items-center gap-8 max-w-2xl mx-auto mt-6 z-10">
            <Button 
              variant="secondary" 
              onClick={() => handleAuthClick('register')}
              className="bg-primary-color text-white/90 transition-all hover:bg-secondary-color"
            >
              Try for free
            </Button>
          </div>
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)}
            initialView={authView}
          />
          <div className="fixed bottom-0 left-0 right-0 h-64 lg:h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--primary-color),transparent_40%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-secondary-color after:bg-zinc-900">
            <Sparkles
              density={1200}
              className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
