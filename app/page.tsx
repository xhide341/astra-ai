import Image from "next/image";
import Link from "next/link";
import GlowingButton from "@/components/buttons/glowing-button";
import BenefitsSection from "@/components/BenefitsSection";

export default function Home() {
  return (
    <div className="flex flex-col font-poppins w-full relative min-h-screen overflow-clip">
      <header className="flex items-center justify-between mx-auto w-full max-w-7xl p-2 z-10">
        <Image src="/logo.png" alt="Aura" width={64} height={64} priority />
        <nav className="flex items-center gap-6 tracking-wide">
          <Link href="/login" className="text-highlight font-medium text-sm hover:text-gray-300">Login</Link>
          <GlowingButton text="Register" />
        </nav>
      </header>

      {/* hero gradient */}
      <div className="isolate transform-gpu absolute inset-0 w-full">
        <div className="absolute inset-0 -z-10 bg-hero-gradient"></div>
        <svg 
          className="absolute inset-0 -z-10 h-full w-full stroke-white/5 [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]" 
          aria-hidden="true"
        >
          <defs>
            <pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)"></rect>
        </svg>
      </div>

      <main className="z-10 py-24 sm:py-32 lg:pb-40 flex flex-col items-center justify-center w-full px-6 lg:px-8">
        {/* hero section */}
        <section className="flex items-center justify-center w-full max-w-7xl mx-auto">
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
              <GlowingButton text="Get started" />
            </div>
          </div>
          {/* <div className="hidden sm:block">
            <Image
              src="/logo.png"
              alt="Aura Logo"
              width={300}
              height={300}
              priority
              className="object-contain"
            />
          </div> */}
        </section>

        {/* features section */}
        <section className="flex flex-col items-center w-full max-w-7xl mx-auto mt-[30vh]">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold relative text-highlight text-center">
              Empower your learning with <span className="text-secondary relative transition-all duration-300 hover:text-tertiary hover:shadow-tertiary">
                Aura
                <span className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-secondary/0 via-secondary/90 to-secondary/0"></span>
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl text-center mt-2">
              AURA empowers users to learn more efficiently with personalized summaries, interactive notes, and AI-generated insights tailored to their needs.
            </p>
          </div>
          <BenefitsSection />
        </section>

        {/* how it works section */}
        <section className="flex items-center justify-between w-full max-w-7xl mx-auto mt-[30vh]">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl font-bold relative bg-gradient-to-r from-primary from-40% to-highlight bg-clip-text text-transparent">
              How can AURA
              <span className="text-highlight absolute ml-2">brighten</span>
              <br />your academ
              <span className="bg-gradient-to-t from-primary from-20% to-highlight bg-clip-text text-transparent">ic journey?</span>
            </h1>
          </div>
          <p className="text-lg text-gray-300 max-w-3xl text-center mt-2">
            AURA illuminates learning by transforming complex topics into clear, digestible insights through AI-generated summaries and smart question suggestions. Its adaptive learning approach dynamically tailors study materials to individual learning styles, ensuring personalized and efficient knowledge acquisition.
          </p>
        </section>

      </main>

      <footer className="">
      </footer>
    </div>
  );
}
