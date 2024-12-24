'use client';

import { cn } from "@/lib/utils";

interface ChatTabProps {
    title: string;
    isActive?: boolean;
    onClick: () => void;
}

const ChatTab = ({ title, isActive, onClick }: ChatTabProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 p-3 w-full rounded-sm transition-colors",
                "hover:bg-gray-200",
                isActive && "bg-gray-200"
            )}
        >
            <p className="text-black text-sm font-medium leading-none truncate">
                {title}
            </p>
        </button>
    );
};

export default ChatTab;
