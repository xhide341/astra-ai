'use client';

import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useChatStore } from '@/hooks/use-chat-store';
import { Message } from '@/types/chat';
import { useCurrentUser } from '@/hooks/use-current-user';
import Image from 'next/image';
import { BeatLoader } from 'react-spinners';
import ReactMarkdown from 'react-markdown';

const Conversation = () => {
    const { messages, isLoading, isLoadingConversation } = useChatStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const user = useCurrentUser();

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };
        if (messages.length > 0) {
            scrollToBottom();
        }
    }, [messages.length, isLoading]);

    return (
        <div className="p-4 space-y-4">
            {isLoadingConversation ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <BeatLoader 
                        size={12}
                        color="#10b981"
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
                                    <div className="w-[30px] h-[30px] bg-teal rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-semibold">AI</span>
                                    </div>
                                )}
                            </div>

                            {/* Message */}
                            <div className={cn(
                                "max-w-[80%] rounded-lg py-3 px-4",
                                message.role === "USER"
                                    ? "bg-teal text-white" 
                                    : "prose prose-sm dark:prose-invert max-w-none"
                            )}>
                                {message.role === "USER" ? (
                                    message.content
                                ) : (
                                    <ReactMarkdown
                                        components={{
                                            h1: ({children}) => (
                                                <h1 className="text-xl font-bold mb-4">{children}</h1>
                                            ),
                                            h2: ({children}) => (
                                                <h2 className="text-lg font-semibold mt-4 mb-2">{children}</h2>
                                            ),
                                            p: ({children}) => (
                                                <p className="mb-3">{children}</p>
                                            ),
                                            ul: ({children}) => (
                                                <ul className="list-disc pl-4 mb-3">{children}</ul>
                                            ),
                                            ol: ({children}) => (
                                                <ol className="list-decimal pl-4 mb-3">{children}</ol>
                                            ),
                                            code: ({children}) => (
                                                <code className="bg-gray-100 dark:bg-gray-800 rounded px-1">{children}</code>
                                            )
                                        }}
                                    >
                                        {message.content}
                                    </ReactMarkdown>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex items-start gap-x-2">
                            <div className="w-[30px] h-[30px] bg-teal rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">AI</span>
                            </div>
                            <div className="py-3 pl-0">
                                <BeatLoader 
                                    size={8}
                                    color="#10b981"
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