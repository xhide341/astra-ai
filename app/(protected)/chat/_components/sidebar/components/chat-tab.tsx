'use client';

import { cn } from "@/lib/utils";
import { useChatStore } from "@/hooks/use-chat-store";
import { MoreVertical, PencilIcon, TrashIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useRef } from "react";
import { updateChatTitle } from "@/actions/chat/update-chat";
import { deleteChat } from "@/actions/chat/delete-chat";
import { showToast } from "@/lib/toast";
import DeleteChatModal from './delete-chat-modal';

interface ChatTabProps {
    id: string;
    title: string;
    isActive?: boolean;
    onClick: () => void;
}

const ChatTab = ({ id, title, isActive, onClick }: ChatTabProps) => {
    const { setIsCompact, setChats, chats, activeChat, setActiveChat } = useChatStore();
    const [isEditing, setIsEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleClick = () => {
        setIsCompact(false);
        onClick();
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        const result = await deleteChat(id);
        if (result.success) {
            setChats(chats.filter(chat => chat.id !== id));
            if (activeChat?.id === id) {
                setActiveChat(null);
                setIsCompact(true);
            }
            showToast.success(result.success);
        } else if (result.error) {
            showToast.error(result.error);
        }
        setIsDeleteModalOpen(false);
    };

    const handleRename = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
        // Delay focus and selection until dropdown closes
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.select(); 
            }
        }, 150);
    };

    const handleSubmit = async (newTitle: string) => {
        if (newTitle !== title) {
            if (newTitle.length >= 3){
            }
            const result = await updateChatTitle(id, newTitle);
            if (result.success) {
                setCurrentTitle(newTitle);
            }
        }
        setIsEditing(false);
    };

    return (
        <>
            <div className={cn(
                "group flex items-center justify-between w-full rounded-sm pr-2",
                "transition-all duration-300 ease-in-out",
                "hover:bg-gray-200 dark:hover:bg-zinc-800",
                isActive && "bg-gray-200 dark:bg-zinc-800"
            )}>
                <button
                    onClick={handleClick}
                    className="flex-1 h-[36px] text-left px-3 py-2 min-w-0 overflow-hidden"
                >
                    {isEditing ? (
                        <input
                            value={currentTitle}
                            ref={inputRef}
                            onChange={(e) => setCurrentTitle(e.target.value)}
                            onBlur={() => handleSubmit(currentTitle)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSubmit(currentTitle);
                                if (e.key === 'Escape') setIsEditing(false);
                            }}
                            autoFocus
                            className="p-0 m-0 h-full flex items-center w-full bg-transparent text-black-600 dark:text-white/80 text-xs font-regular focus:outline-none"
                            onClick={(e) => e.stopPropagation()}
                        />
                    ) : (
                        <p 
                            onDoubleClick={handleRename}
                            className="w-full text-black-600 dark:text-white/80 text-xs font-regular truncate"
                        >
                            {currentTitle}
                        </p>
                    )}
                </button>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="focus:ring-0" >
                        <button 
                            className={cn(
                                "transition-opacity focus:ring-0",
                                "opacity-0 group-hover:opacity-100 focus:opacity-100",
                                isActive && "opacity-100"
                            )}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreVertical className="h-4 w-4 text-zinc-500 active:opacity-100 focus:opacity-100 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-full" onCloseAutoFocus={(e) => e.preventDefault()}>
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
            <DeleteChatModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title={currentTitle}
            />
        </>
    );
};

export default ChatTab;
