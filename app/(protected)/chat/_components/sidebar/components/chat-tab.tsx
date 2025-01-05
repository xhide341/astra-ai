'use client';

import { cn } from "@/lib/utils";
import { useChatStore } from "@/hooks/use-chat-store";

interface ChatTabProps {
    title: string;
    isActive?: boolean;
    onClick: () => void;
}

const ChatTab = ({ title, isActive, onClick }: ChatTabProps) => {
    const { setIsCompact } = useChatStore();

    const handleClick = () => {
        setIsCompact(false);
        onClick();
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "flex items-center gap-2 w-full rounded-sm",
                "transition-all duration-300 ease-in-out",
                "hover:bg-gray-200 dark:hover:bg-zinc-800",
                isActive && "bg-gray-200 dark:bg-zinc-800"
            )}
        >
            <p className="text-black-600 dark:text-white/80 text-sm font-medium leading-relaxed px-3 py-2 truncate z-10">
                {title}
            </p>
        </button>
    );
};

export default ChatTab;
