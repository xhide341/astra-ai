'use client'

import { Play } from "@phosphor-icons/react";

interface PlayButtonProps {
  text?: string;
}

export default function PlayButton({ text }: PlayButtonProps) {
  return (
    <button className="flex items-center gap-2 backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 text-white font-medium py-2 px-4 rounded transition-all">
      <Play size={16} weight="fill" color="white" />
      {text}
    </button>
  );
}