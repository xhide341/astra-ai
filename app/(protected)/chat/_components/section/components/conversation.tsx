'use client';

import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useChatStore } from '@/hooks/use-chat-store';
import { Message } from '@/types/chat';
import { useCurrentUser } from '@/hooks/use-current-user';
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';

const Conversation = () => {
    const { messages, isLoading, isLoadingConversation } = useChatStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const user = useCurrentUser();

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };
        scrollToBottom();
    }, [messages.length, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoadingConversation ? (
                <div className="flex items-center justify-center h-full">
                    <BeatLoader 
                        size={12}
                        color="#3B82F6"
                        speedMultiplier={0.7}
                    />
                </div>
            ) : (
                <>
                    {messages.map((message: Message) => (
                        <div 
                            key={message.id}
                            className={cn(
                                "flex items-start",
                                message.role === "USER" 
                                    ? "flex-row-reverse gap-x-3" 
                                    : "flex-row gap-x-2"
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
                                "max-w-[80%] rounded-full py-3 px-3 text-sm",
                                message.role === "USER"
                                    ? "bg-blue-500 text-white" 
                                    : "bg-transparent px-0 py-0 my-auto"
                            )}>
                                {message.content}
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex items-start gap-x-2">
                            <div className="w-[30px] h-[30px] bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">AI</span>
                            </div>
                            <div className="py-3 pl-0">
                                <BeatLoader 
                                    size={8}
                                    color="#3B82F6"
                                    speedMultiplier={0.7}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Conversation;