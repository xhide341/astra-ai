'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/hooks/use-chat-store";
import { createChat } from "@/actions/chat/create-chat";
import { sendTopic, generateAIResponse } from "@/actions/chat/send-message";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
    onFocus: () => void;
}

const MessageInput = ({ onFocus }: MessageInputProps) => {
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { 
        activeChat, 
        isLoading, 
        setIsLoading, 
        setError,
        setActiveChat,
        setChats,
        chats,
        addMessage
    } = useChatStore();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;
        
        try {
            setIsLoading(true);
            setError(null);

            // Create chat only when first message is being sent
            if (!activeChat) {
                const chatResponse = await createChat();
                if (chatResponse.error) {
                    setError(chatResponse.error);
                    return;
                }
                if (chatResponse.chat) {
                    setChats([chatResponse.chat, ...chats]);
                    setActiveChat(chatResponse.chat);
                    
                    const response = await sendTopic(chatResponse.chat.id, message);
                    if (response.error) {
                        setError(response.error);
                        return;
                    }
                    if (response.message) {
                        addMessage(response.message);
                        
                        // Start streaming AI responses
                        const aiResponse = await generateAIResponse(chatResponse.chat.id, message);
                        if (aiResponse.error) {
                            setError(aiResponse.error);
                            return;
                        }
                    }
                }
            }
            setMessage("");
            inputRef.current?.focus();
        } catch (error) {
            console.error("Error sending message:", error);
            setError('Failed to send message');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <form 
            onSubmit={handleSubmit}
            className="border-t p-4"
        >
            <div className="flex items-center gap-x-2">
                <Input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={onFocus}
                    placeholder="Enter a topic to learn about..."
                    disabled={isLoading}
                    className="leading-relaxed py-5 resize-none focus-visible:ring-0 outline-none"
                />
                <Button 
                    type="submit" 
                    size="icon"
                    disabled={isLoading || !message.trim()}
                >
                    <PaperAirplaneIcon className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};

export default MessageInput;