'use client'

interface GlowingButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function GlowingButton({ 
  text, 
  onClick, 
  type = 'button' 
}: GlowingButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="group relative rounded-full p-px text-sm/6 text-highlight duration-300 hover:text-highlight-300 hover:shadow-glow"
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,var(--primary-color)_0%,var(--obsidian)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        </span>
      </span>
      
      <div className="relative z-10 rounded-full bg-obsidian px-4 py-1.5 ring-1 ring-white/10">
        {text}
      </div>
      
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-primary/0 via-primary/90 to-primary/0 transition-opacity duration-500 group-hover:opacity-40">
      </span>
    </button>
  );
}
