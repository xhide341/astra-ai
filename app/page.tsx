import Image from "next/image";
import Link from "next/link";
import GlowingButton from "@/components/ui/buttons/glowing-button";
import { StarIcon } from "@heroicons/react/24/solid";
import { Sparkles } from "@/components/ui/sparkles";
import { ThemeToggle } from "@/components/ui/theme-toggle";


export default function Home() {
  return (
    <div className="flex flex-col font-poppins w-full relative min-h-screen overflow-clip bg-gray-100 dark:bg-zinc-900">
      <header className="sticky top-0 flex items-center w-full max-w-full p-1 z-50 bg-primary-color dark:bg-zinc-900/75 dark:backdrop-blur-md dark:border-b dark:border-zinc-800">
        <div className="flex items-center gap-6 max-w-7xl mx-auto justify-between w-full">
          <Image src="/logo.png" alt="Aura" width={64} height={64} priority />
          <nav className="flex items-center gap-6 tracking-wide">
            <Link href="/auth/login" className="text-white/80 font-thin text-sm hover:text-white">Login</Link>
            <GlowingButton text="Register" href="/auth/register" ariaLabel="Navigate to register page" />
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="z-10 flex flex-col items-center justify-center w-full px-6 lg:px-8">
        {/* hero section */}
        <section className="flex items-center justify-center w-full max-w-7xl mx-auto sm:py-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <StarIcon className="h-5 w-5 text-yellow-500" />
                <p className="text-sm text-primary-color dark:text-white/80">
                  Over 10,000 Topics Discussed!
                </p>
              </div>
              <h1 className="text-4xl/[1.25] sm:text-5xl/[1.25] mb-4 font-bold text-primary-color dark:text-white/80 max-w-2xl leading-normal">
              Observe, Reflect, and Learn — Effortlessly.
              </h1>
              <p className="text-lg text-secondary-color dark:text-white/80 max-w-[500px] mb-6">
                Two AI minds explore ideas, so you can focus on understanding and insights.
              </p>
              <div className="flex items-center gap-4 text-primary-color">
                <GlowingButton text="Get started" href="/auth/register" ariaLabel="Navigate to register page" />
              </div>
            </div>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              {/* <Image
                src="/hero-placeholder.png"
                alt="AI Learning Platform"
                fill
                className="object-cover"
                priority
              /> */}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center w-full max-w-7xl mx-auto relative sm:pt-36 h-[50dvh]">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl/[1.25] sm:text-4xl/[1.25] mb-4 font-bold text-primary-color dark:text-white/80 max-w-2xl leading-normal">
              Just enter a topic
            </h2>
            <p className="text-md text-secondary-color dark:text-white/80 max-w-[500px] mb-6">
              and let two AI minds discuss it in depth.
            </p>

            <div className="relative -mt-32 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--primary-color),transparent_40%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-secondary-color after:bg-zinc-900">
             <Sparkles
                density={1200}
                className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
