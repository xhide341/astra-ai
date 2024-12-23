'use client';

import { cn } from "@/lib/utils";

interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    createdAt: Date;
}

interface ConversationProps {
    messages?: Message[];
    isLoading?: boolean;
}

const Conversation = ({
    messages = [],
    isLoading
}: ConversationProps) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
                <div 
                    key={message.id}
                    className={cn(
                        "flex w-full",
                        message.role === "user" ? "justify-end" : "justify-start"
                    )}
                >
                    <div className={cn(
                        "max-w-[80%] rounded-lg p-3",
                        message.role === "user" 
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
        </div>
    );
};
export default Conversation;