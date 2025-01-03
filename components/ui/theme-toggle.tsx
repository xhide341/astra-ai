'use client';

import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder with same dimensions
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 rounded-lg bg-zinc-800/20 hover:bg-zinc-800/30 transition-colors"
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : 180,
        }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <MoonIcon className="h-5 w-5 text-primary-color dark:text-white/90" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : -180,
        }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <SunIcon className="h-5 w-5 text-primary-color dark:text-white/90" />
      </motion.div>
      
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
}; 