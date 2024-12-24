import Image from "next/image";
import Link from "next/link";
import GlowingButton from "@/components/ui/buttons/glowing-button";
import FooterSection from "@/components/(root)/footer-section";

export default function Home() {
  return (
    <div className="flex flex-col font-poppins w-full relative min-h-screen overflow-clip bg-black">
      <header className="flex items-center justify-between mx-auto w-full max-w-7xl p-2 z-10">
        <Image src="/logo.png" alt="Aura" width={64} height={64} priority />
        <nav className="flex items-center gap-6 tracking-wide">
          <Link href="/auth/login" className="text-highlight font-medium text-sm hover:text-gray-300">Login</Link>
          <GlowingButton text="Register" href="/auth/register" ariaLabel="Navigate to register page" />
        </nav>
      </header>

      <main className="z-10 sm:pt-32 pt-24 flex flex-col items-center justify-center w-full px-6 lg:px-8">
        {/* hero section */}
        <section className="flex items-center justify-center w-full max-w-7xl mx-auto py-24">
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-5xl/[1.25] sm:text-6xl/[1.25] font-bold text-highlight max-w-2xl text-center leading-normal">
              AI-Powered Learning, Personalized for You
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl text-center">
              Your intelligent study companion that adapts to your learning style
              <br />
              and helps you master any subject
            </p>
            <div className="flex items-center gap-4">
              <GlowingButton text="Get started" href="/register" ariaLabel="Navigate to register page" />
            </div>
          </div>
        </section>

        {/* features section */}
        <section className="flex flex-col items-center w-full max-w-7xl mx-auto py-24 relative">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold relative text-highlight text-center">
              Empower your learning with <span className="text-secondary relative transition-all duration-300 hover:text-tertiary hover:shadow-tertiary">
                Aura
                <span className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-teal-400/0 via-teal-400/90 to-teal-400/0"></span>
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl text-center mt-2">
              AURA empowers users to learn more efficiently with personalized summaries, interactive notes, and AI-generated insights tailored to their needs.
            </p>
          </div>          
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
