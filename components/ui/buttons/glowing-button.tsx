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
        group relative rounded-full p-px text-sm/6 text-highlight 
        duration-300 hover:text-highlight-300 hover:shadow-glow
        focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${disabled ? 'hover:text-highlight hover:shadow-none' : ''}
      `}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <span 
        className="absolute inset-0 overflow-hidden rounded-full"
        aria-hidden="true"
      >
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,#10b981_0%,var(--obsidian)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        </span>
      </span>
      
      <div 
        className="relative z-10 rounded-full bg-obsidian px-4 py-1.5 ring-1 ring-white/10"
        aria-hidden="true"
      >
        {text}
      </div>
      
      <span 
        className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-teal-400/0 via-teal-400/90 to-teal-400/0 transition-opacity duration-500 group-hover:opacity-40"
        aria-hidden="true"
      >
      </span>
    </button>
  );

  return href ? (
    <Link href={href}>
      {ButtonContent}
    </Link>
  ) : (
    ButtonContent
  );
}
