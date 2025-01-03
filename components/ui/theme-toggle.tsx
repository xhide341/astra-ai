'use client';

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-12 h-6" />; // Smaller placeholder
  }

  return (
    <label className={cn(
      "relative inline-flex items-center cursor-pointer",
      className
    )}>
      <input
        type="checkbox"
        className="sr-only"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
      />
      <div className="flex h-6 w-12 items-center rounded-full bg-gray-400 p-0.5 dark:bg-gray-700">
        <div className="flex w-full items-center justify-between px-1.5">
          <SunIcon className={`h-3 w-3 ${!isDark ? 'text-yellow-500 drop-shadow-[0_0_4px_rgba(250,204,21,0.6)]' : 'text-gray-500 opacity-50'} transition-all duration-300`} />
          <MoonIcon className={`h-3 w-3 ${isDark ? 'text-white drop-shadow-[0_0_4px_rgba(96,165,250,0.6)]' : 'text-gray-500 opacity-50'} transition-all duration-300`} />
        </div>
        <div 
          className={`absolute h-5 w-5 rounded-full bg-white shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:bg-slate-800
            ${isDark ? 'opacity-30 translate-x-[1.35rem]' : 'opacity-30 translate-x-0.5'}`}
        />
      </div>
    </label>
  );
}; 