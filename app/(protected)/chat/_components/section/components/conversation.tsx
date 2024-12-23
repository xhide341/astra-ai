'use client';

import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useChatStore } from '@/hooks/use-chat-store';
import { Message } from '@/types/chat';

const Conversation = () => {
    const { messages, isLoading } = useChatStore();
    const conversationRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message: Message) => (
                <div 
                    key={message.id}
                    className={cn(
                        "flex w-full",
                        message.role === "USER" ? "justify-end" : "justify-start"
                    )}
                >
                    <div className={cn(
                        "max-w-[80%] rounded-lg p-3",
                        message.role === "USER"
                            ? "bg-blue-500 text-white" 
                            : "bg-gray-200 dark:bg-gray-700"
                    )}>
                        {message.content}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex items-center justify-center p-4">
                    <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent" />
                </div>
            )}
            <div ref={conversationRef} />
        </div>
    );
};

export default Conversation;