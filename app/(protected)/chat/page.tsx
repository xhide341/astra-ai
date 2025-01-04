'use client';

import Sidebar from '@/app/(protected)/chat/_components/sidebar/sidebar';
import ChatSection from '@/app/(protected)/chat/_components/section/chat-section';
import { useChatStore } from '@/hooks/use-chat-store';
import { cn } from '@/lib/utils';

const ChatPage = () => {
    const { isSidebarOpen } = useChatStore();

    return (
        <div className="flex w-full max-w-screen max-h-screen h-screen dark:bg-zinc-900">
            <div className={cn(
                "transition-all duration-300 ease-in-out max-h-screen overflow-y-auto",
                isSidebarOpen ? "w-[260px] flex-shrink-0 max-w-[260px]" : "w-0"
            )}>
                <Sidebar />
            </div>
            <div className="h-full w-full p-2">
                <ChatSection />
            </div>
        </div>
    );
};

export default ChatPage;
