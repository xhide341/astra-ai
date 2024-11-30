import Image from "next/image";
import Link from "next/link";
import PlayButton from "@/components/buttons/play-button";


export default function Home() {
  return (
    <div className="flex flex-col font-poppins w-full relative min-h-screen overflow-clip">
      <header className="px-2 sm:px-4 flex items-center w-full p-2 justify-around z-10">
        <Image src="/logo.png" alt="Aura" width={64} height={64} priority />
        <nav className="flex items-center gap-6 tracking-wide">
          <Link href="/login">Login</Link>
          <Link href="/register">
            <button className="hover:text-gray-200 text-highlight font-medium py-2 px-4 rounded bg-primary">
              Register
            </button>
          </Link>
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

      <main className="z-10 px-2 sm:px-4 flex flex-col items-center justify-center w-full min-h-[calc(100vh-300px)]">
        {/* hero section */}
        <section className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Meet Aura</h1>
            <p className="text-lg text-gray-600">
              Your Academic Understanding and Resource Assistant
            </p>
            <div className="flex items-center gap-4">
              <button className="hover:text-gray-200 text-highlight font-medium py-2 px-4 rounded bg-primary">
                Get Started
              </button>
              <PlayButton text="Learn More" />
            </div>
          </div>
          <div className="hidden sm:block">
            <Image
              src="/logo.png"
              alt="Aura Logo"
              width={300}
              height={300}
              priority
              className="object-contain"
            />
          </div>
        </section>
        {/* features section */}
        <section className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl font-bold relative bg-gradient-to-r from-primary from-40% to-highlight bg-clip-text text-transparent">
              How can AURA
              <span className="text-highlight absolute ml-2">brighten</span>
              <br />your academ
              <span className="bg-gradient-to-t from-primary from-20% to-highlight bg-clip-text text-transparent">ic journey?</span>
            </h1>
          </div>
        </section>
      </main>

      <footer className="">
      </footer>
    </div>
  );
}
