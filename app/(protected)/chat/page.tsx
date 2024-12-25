'use client';

import Sidebar from '@/app/(protected)/chat/_components/sidebar/sidebar';
import ChatSection from '@/app/(protected)/chat/_components/section/chat-section';
import { useChatStore } from '@/hooks/use-chat-store';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const ChatPage = () => {
    const { isSidebarOpen, connectToSSE, disconnectFromSSE } = useChatStore();

    // Connect to SSE when component mounts
    // Disconnect when component unmounts
    useEffect(() => {
        connectToSSE();
        
        // Cleanup function
        return () => {
            disconnectFromSSE();
        };
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="flex h-screen w-full max-w-screen">
            <div className={cn(
                "transition-all duration-300 ease-in-out",
                isSidebarOpen ? "w-[260px]" : "w-0"
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
