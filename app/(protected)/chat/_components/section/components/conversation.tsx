'use client';

import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useChatStore } from '@/hooks/use-chat-store';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { BeatLoader } from "react-spinners";
import Image from 'next/image';

const Conversation = () => {
    const { 
        messages,
        isLoading,
        isStreaming,
        currentStreamedContent,
        streamRole,
        activeChat,
        setIsLoading
    } = useChatStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const lastMessageIdRef = useRef<string | null>(null);

    
    useEffect(() => {
        // Reset the refs when a new conversation starts (i.e., when streaming begins)
        if (isStreaming) {
            lastMessageIdRef.current = null;
        }

        // Show toast when AI completes its response
    }, [messages, isStreaming]);

    // Auto-scroll on new messages or streaming updates
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, currentStreamedContent]);

    // Filter messages to only show those matching active chat
    const filteredMessages = messages.filter(message => 
        message.chatId === activeChat?.id
    );

    useEffect(() => {
        // Only set loading when we have an active chat
        if (activeChat) {
            setIsLoading(true);
            // Set loading to false when we have messages for the active chat
            if (messages.some(m => m.chatId === activeChat.id)) {
                setIsLoading(false);
            }
        } else {
            // If no active chat (new chat state), ensure loading is false
            setIsLoading(false);
        }
    }, [messages, activeChat, setIsLoading]);

    const getMessageBgColor = (role: string) => {
        switch (role) {
            case "USER":
                return "bg-blue-50";
            case "TEACHER":
                return "bg-green-50";
            case "FACILITATOR":
                return "bg-purple-50";
            default:
                return "bg-gray-50";
        }
    };

    return (
        <div className="p-4 space-y-4 relative min-h-[calc(100vh-200px)]">
            {filteredMessages.map((message) => (
                <div key={message.id} className={cn(
                    "flex items-start gap-x-2",
                    message.role === "USER" ? "flex-row-reverse" : "flex-row"
                )}>
                    <div className="flex-shrink-0">
                        <Image 
                            src={`https://ui-avatars.com/api/?name=${message.role}&background=${message.role === "USER" ? "4F46E5" : message.role === "TEACHER" ? "22C55E" : "A855F7"}&color=ffffff`}
                            alt={`${message.role} avatar`}
                            className="w-[30px] h-[30px] rounded-full"
                            width={30}
                            height={30}
                        />
                    </div>
                    <div className={cn(
                        "max-w-[80%] rounded-lg py-3 px-4 prose prose-sm dark:prose-invert max-w-none break-normal overflow-auto text-sm",
                        getMessageBgColor(message.role)
                    )}>
                        <ReactMarkdown
                            className="overflow-auto"
                            components={{
                                h1: ({children}) => (
                                    <h1 className="text-xl font-bold mb-4">{children}</h1>
                                ),
                                h2: ({children}) => (
                                    <h2 className="text-lg font-semibold mt-4 mb-2">{children}</h2>
                                ),
                                p: ({children}) => (
                                    <p className="mb-3 break-words">{children}</p>
                                ),
                                ul: ({children}) => (
                                    <ul className="list-disc pl-4 mb-3">{children}</ul>
                                ),
                                ol: ({children}) => (
                                    <ol className="list-decimal pl-4 mb-3">{children}</ol>
                                ),
                                code: ({className, children}) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    
                                    return match ? (
                                        <div className="overflow-x-auto">
                                            <SyntaxHighlighter
                                                language={match[1]}
                                                style={atomOneDarkReasonable}
                                                customStyle={{
                                                    borderRadius: '0.5rem',
                                                    padding: '1rem',
                                                    margin: 0,
                                                    maxWidth: '100%',
                                                }}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        </div>
                                    ) : (
                                        <SyntaxHighlighter
                                            language="text"
                                            style={atomOneDarkReasonable}
                                            customStyle={{
                                                padding: '0.125rem 0.25rem',
                                                margin: 0,
                                                borderRadius: '0.25rem',
                                                display: 'inline',
                                            }}
                                            PreTag="span"
                                        >
                                            {String(children)}
                                        </SyntaxHighlighter>
                                    );
                                }
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                </div>
            ))}

            {/* Only show streaming content if it matches active chat */}
            {isStreaming && currentStreamedContent && activeChat && (
                <div className="flex items-start gap-x-2">
                    <div className="flex-shrink-0">
                        <Image 
                            src={`https://ui-avatars.com/api/?name=${streamRole ?? "AI"}&background=${streamRole === "TEACHER" ? "22C55E" : streamRole === "FACILITATOR" ? "A855F7" : "6B7280"}&color=ffffff`}
                            alt={`${streamRole ?? "AI"} avatar`}
                            className="w-[30px] h-[30px] rounded-full"
                            width={30}
                            height={30}
                        />
                    </div>
                    <div className={cn(
                        "max-w-[80%] rounded-lg py-3 px-4 prose prose-sm dark:prose-invert max-w-none break-normal overflow-auto text-sm",
                        getMessageBgColor(streamRole ?? "DEFAULT")
                    )}>
                        <ReactMarkdown
                            className="overflow-auto"
                            components={{
                                h1: ({children}) => (
                                    <h1 className="text-xl font-bold mb-4">{children}</h1>
                                ),
                                h2: ({children}) => (
                                    <h2 className="text-lg font-semibold mt-4 mb-2">{children}</h2>
                                ),
                                p: ({children}) => (
                                    <p className="mb-3 break-words">{children}</p>
                                ),
                                ul: ({children}) => (
                                    <ul className="list-disc pl-4 mb-3">{children}</ul>
                                ),
                                ol: ({children}) => (
                                    <ol className="list-decimal pl-4 mb-3">{children}</ol>
                                ),
                                code: ({className, children}) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    
                                    return match ? (
                                        <div className="overflow-x-auto">
                                            <SyntaxHighlighter
                                                language={match[1]}
                                                style={atomOneDarkReasonable}
                                                customStyle={{
                                                    borderRadius: '0.5rem',
                                                    padding: '1rem',
                                                    margin: 0,
                                                    maxWidth: '100%',
                                                }}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        </div>
                                    ) : (
                                        <SyntaxHighlighter
                                            language="text"
                                            style={atomOneDarkReasonable}
                                            customStyle={{
                                                padding: '0.125rem 0.25rem',
                                                margin: 0,
                                                borderRadius: '0.25rem',
                                                display: 'inline',
                                            }}
                                            PreTag="span"
                                        >
                                            {String(children)}
                                        </SyntaxHighlighter>
                                    );
                                }
                            }}
                        >
                            {currentStreamedContent}
                        </ReactMarkdown>
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <BeatLoader 
                        size={8}
                        color="var(--primary-color)"
                        speedMultiplier={0.7}
                    />
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Conversation;