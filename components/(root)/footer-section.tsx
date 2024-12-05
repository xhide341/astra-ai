'use client';

import Image from 'next/image';

export default function FooterSection() {
  return (
    <footer className="flex flex-col items-center justify-center w-full mx-auto z-10 pt-16 px-6 lg:px-8">
      <div className="w-full">
        <hr className="w-full border-t border-gray-800" />
      </div>
    <div className="flex justify-between items-center w-full py-4 sm:py-6 px-1 sm:px-2">
        <p className="text-sm font-light text-gray-300">
          &copy; 2024 AURA. All rights reserved.
        </p>
        <a href="https://github.com/xhide341/aura-bot" 
           target="_blank" 
           rel="noopener noreferrer"
           className="hover:animate-[spin_0.5s_linear_infinite]">
          <Image src="/github-logo.svg" alt="Github Logo" width={30} height={30} />
        </a>
      </div>
    </footer>
  )
}
