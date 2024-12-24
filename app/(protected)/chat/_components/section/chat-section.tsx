'use client';

import { Bars3Icon } from "@heroicons/react/24/outline";
import Conversation from './components/conversation';
import MessageInput from './components/message-input';
import { useChatStore } from '@/hooks/use-chat-store';
import { cn } from "@/lib/utils";

const ChatSection = () => {
    const { activeChat, error, isSidebarOpen, toggleSidebar } = useChatStore();

    return (
        <div className="flex flex-col h-full w-full p-2 bg-gray-100 border-4 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-x-3">
                    <button
                        onClick={toggleSidebar}
                        className={cn(
                            "p-2 hover:bg-gray-200 rounded-full",
                            isSidebarOpen && "hidden"
                        )}
                    >
                        <Bars3Icon className="h-5 w-5" />
                    </button>
                    <h2 className="text-xl font-semibold">
                        {activeChat?.title || 'New Chat'}
                    </h2>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="flex-1 flex justify-center">
                <div className="w-full max-w-2xl flex flex-col">
                    <Conversation />
                    <MessageInput />
                </div>
            </div>
        </div>
    );
};

export default ChatSection;