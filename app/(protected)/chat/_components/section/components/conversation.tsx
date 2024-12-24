'use client';

import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useChatStore } from '@/hooks/use-chat-store';
import { Message } from '@/types/chat';
import { useCurrentUser } from '@/hooks/use-current-user';
import Image from 'next/image';

const Conversation = () => {
    const { messages, isLoading } = useChatStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const user = useCurrentUser();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message: Message) => (
                <div 
                    key={message.id}
                    className={cn(
                        "flex items-start gap-x-3",
                        message.role === "USER" ? "flex-row-reverse" : "flex-row"
                    )}
                >
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        {message.role === "USER" ? (
                            user?.image ? (
                                <Image
                                    src={user.image}
                                    alt="User"
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="w-[30px] h-[30px] bg-gray-200 rounded-full" />
                            )
                        ) : (
                            <div className="w-[30px] h-[30px] bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">AI</span>
                            </div>
                        )}
                    </div>

                    {/* Message */}
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
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Conversation;