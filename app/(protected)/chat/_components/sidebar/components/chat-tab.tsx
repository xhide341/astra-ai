'use client';

import { cn } from "@/lib/utils";
import { useChatStore } from "@/hooks/use-chat-store";
import { MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatEditForm from "./chat-edit-form";
import { useState } from "react";
import { updateChatTitle } from "@/actions/chat/update-chat";

interface ChatTabProps {
    id: string;
    title: string;
    isActive?: boolean;
    onClick: () => void;
}

const ChatTab = ({ id, title, isActive, onClick }: ChatTabProps) => {
    const { setIsCompact } = useChatStore();
    const [isEditing, setIsEditing] = useState(false);

    const handleClick = () => {
        setIsCompact(false);
        onClick();
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        // Will use id for delete action
        console.log("Deleting chat:", id);
    };

    const handleRename = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleSubmitEdit = async (newTitle: string) => {
        const result = await updateChatTitle(id, newTitle);
        if (result.success) {
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <ChatEditForm
                initialTitle={title}
                onSubmit={handleSubmitEdit}
                onCancel={() => setIsEditing(false)}
            />
        );
    }

    return (
        <div
            className={cn(
                "group flex items-center justify-between w-full rounded-sm pr-2",
                "transition-all duration-300 ease-in-out",
                "hover:bg-gray-200 dark:hover:bg-zinc-800",
                isActive && "bg-gray-200 dark:bg-zinc-800"
            )}
        >
            <button
                onClick={handleClick}
                className="flex-1 text-left py-2 px-3 min-w-0"
            >
                <p className="text-black-600 dark:text-white/80 text-xs font-regular leading-relaxed truncate">
                    {title}
                </p>
            </button>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="focus:ring-0">
                    <button 
                        className="opacity-0 group-hover:opacity-100 transition-opacity focus:ring-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreHorizontal className="h-4 w-4 text-zinc-500 focus:opacity-100 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-full">
                    <DropdownMenuItem 
                        onClick={handleRename}
                        className="text-xs cursor-pointer"
                    >
                        <PencilIcon className="h-4 w-4" />
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={handleDelete}
                        className="text-xs cursor-pointer"
                    >
                        <TrashIcon className="h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ChatTab;
