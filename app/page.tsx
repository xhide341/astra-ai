import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "@/components/ui/sparkles";
import DynamicTagline from "@/components/ui/dynamic-tagline";



export default function Home() {
  return (
    <div className="flex flex-col font-poppins w-full relative min-h-screen overflow-clip bg-gray-100 dark:bg-zinc-900">
      <main className="z-10 flex flex-1 flex-col items-center justify-between w-full px-6 lg:px-8">
        <section className="flex flex-col items-center w-full mx-auto pt-20 flex-1">
          <div className="text-center pt-20">
            <h2 className="text-3xl/[1.25] sm:text-4xl/[1.25] mb-4 font-bold text-white/80 max-w-2xl leading-normal">
              Just enter a topic and...
            </h2>
            <DynamicTagline 
              taglines={[
                "and let two AI minds discuss it in depth.",
                "watch as AI agents debate and explore ideas.",
                "experience dynamic AI-powered conversations.",
                "discover new perspectives through AI dialogue."
              ]}
              className="text-md text-white/80 max-w-[500px] mb-6"
            />
          </div>
          <div className="flex flex-row justify-between items-center gap-8 max-w-2xl mx-auto mt-6">
            <Link href="/auth/login" className="text-white/80 font-base text-sm hover:text-white transition-all">
              Login
            </Link>
            <Button variant="secondary" className="bg-primary-color transition-all hover:bg-secondary-color">
              <Link href="/auth/register">Try for free</Link>
            </Button>
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
