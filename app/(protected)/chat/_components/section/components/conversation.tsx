'use client';

import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { useChatStore } from '@/hooks/use-chat-store';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const Conversation = () => {
    const { 
        activeChat,
        messages,
        isLoading,
        isStreaming,
        currentStreamedContent,
        streamRole
    } = useChatStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);


    // Auto-scroll on new messages or streaming updates
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, currentStreamedContent]);

    // Debug logs
    console.log("Conversation state:", {
        activeChat: activeChat?.id || 'none',
        messageCount: messages.length
    });

    return (
        <div className="p-4 space-y-4">
            {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-x-2">
                    <div className="flex-shrink-0">
                        <div className={cn(
                            "w-[30px] h-[30px] rounded-full flex items-center justify-center",
                            "bg-blue-500"
                        )}>
                            <span className="text-white text-sm font-semibold">
                                {message.role === "USER" ? "U" : 
                                 message.role === "TEACHER" ? "T" : "F"}
                            </span>
                        </div>
                    </div>
                    <div className={cn(
                        "max-w-[80%] rounded-lg py-3 px-4 prose prose-sm dark:prose-invert max-w-none break-normal overflow-auto text-sm",
                        "bg-blue-50"
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

            {/* Show streaming message */}
            {isStreaming && currentStreamedContent && (
                <div className="flex items-start gap-x-2">
                    <div className="flex-shrink-0">
                        <div className={cn(
                            "w-[30px] h-[30px] rounded-full flex items-center justify-center",
                            "bg-blue-500"
                        )}>
                            <span className="text-white text-sm font-semibold">
                                {streamRole === "TEACHER" ? "T" : 
                                 streamRole === "FACILITATOR" ? "F" : "AI"}
                            </span>
                        </div>
                    </div>
                    <div className={cn(
                        "max-w-[80%] rounded-lg py-3 px-4 prose prose-sm dark:prose-invert max-w-none break-normal overflow-auto text-sm",
                        "bg-blue-50"
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
                <div className="flex items-center justify-center">
                    <div className="animate-pulse">Thinking...</div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Conversation;