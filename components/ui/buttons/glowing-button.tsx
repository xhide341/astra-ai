'use client'

import Link from 'next/link';

interface GlowingButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
}

export default function GlowingButton({ 
  text, 
  onClick, 
  href,
  type = 'button',
  disabled = false,
  ariaLabel,
}: GlowingButtonProps) {
  const ButtonContent = (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      role="button"
      tabIndex={0}
      className={`
        group relative rounded-full p-px text-sm/6
        duration-300 hover:shadow-glow focus:outline-none focus:ring-0 focus:ring-offset-0 
        disabled:opacity-50 disabled:cursor-not-allowed 
        ${disabled ? 'hover:shadow-none' : ''}
      `}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Outer container for the glowing effect */}
      <span 
        className="absolute inset-0 overflow-hidden rounded-full"
        aria-hidden="true"
      >
        {/* Radial gradient background that creates the glow effect on hover */}
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,#10b981_0%,var(--black-500)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        </span>
      </span>
      
      {/* Button content container with background and text */}
      <div 
        className="relative z-10 rounded-full bg-primary-color dark:bg-black-500 border-0 px-4 py-1.5 ring-0 text-white/80"
        aria-hidden="true"
      >
        {text}
      </div>
      
      {/* Bottom border with gradient effect */}
      <span 
        className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-primary-color/0 via-primary-color/90 to-primary-color/0 transition-opacity duration-500 group-hover:opacity-40 "
        aria-hidden="true"
      >
      </span>
    </button>
  );

  // Wrap button in Link component if href is provided
  return href ? (
    <Link href={href}>
      {ButtonContent}
    </Link>
  ) : (
    ButtonContent
  );
}
