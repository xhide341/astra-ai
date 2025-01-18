import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "@/components/ui/sparkles";



export default function Home() {
  return (
    <div className="flex flex-col font-poppins w-full relative min-h-screen overflow-clip bg-gray-100 dark:bg-zinc-900">
      <header className="sticky top-0 flex items-center w-full max-w-full p-1 z-50 bg-primary-color dark:bg-zinc-900/75 dark:backdrop-blur-md dark:border-b dark:border-zinc-800">
        <div className="flex items-center gap-6 max-w-7xl mx-auto justify-between w-full">
          <Image src="/logo.png" alt="Aura" width={64} height={64} priority />
          <nav className="flex items-center gap-6 tracking-wide">
            <Link href="/auth/login" className="text-white/80 font-thin text-sm hover:text-white">Login</Link>
            <Button asChild variant="secondary">
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="z-10 flex flex-1 flex-col items-center justify-between w-full px-6 lg:px-8">
        <section className="flex flex-col items-center w-full mx-auto pt-20 flex-1">
          <div className="text-center">
            <h2 className="text-3xl/[1.25] sm:text-4xl/[1.25] mb-4 font-bold text-primary-color dark:text-white/80 max-w-2xl leading-normal">
              Just enter a topic
            </h2>
            <p className="text-md text-secondary-color dark:text-white/80 max-w-[500px] mb-6">
              and let two AI minds discuss it in depth.
            </p>
          </div>
          <div className="fixed bottom-0 left-0 right-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,var(--primary-color),transparent_40%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-secondary-color after:bg-zinc-900">
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
