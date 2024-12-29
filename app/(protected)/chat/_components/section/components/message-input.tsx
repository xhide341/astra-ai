'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/hooks/use-chat-store";
import { createChat } from "@/actions/chat/create-chat";
import { Input } from "@/components/ui/input";
import { useChatStream } from "@/hooks/use-chat-stream";
import { triggerAI } from "@/actions/chat/trigger-ai";
import { sendMessage } from "@/actions/chat/send-message";

interface MessageInputProps {
    onFocus: () => void;
}

const MessageInput = ({ onFocus }: MessageInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { 
        activeChat,
        chats,
        setChats,
        setActiveChat,
        setError
    } = useChatStore();
    const { setupStream } = useChatStream();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;
        
        try {
            setIsLoading(true);
            setError(null);

            // Create chat if needed
            let currentChatId = activeChat?.id;
            if (!currentChatId) {
                const chatResponse = await createChat();
                if (!chatResponse.chat) {
                    setError("Failed to create chat");
                    return;
                }
                setChats([chatResponse.chat, ...chats]);
                setActiveChat(chatResponse.chat);
                currentChatId = chatResponse.chat.id;
            }

            // Save user message
            const response = await sendMessage(currentChatId, message);
            if (response.error) {
                throw new Error(response.error);
            }

            // Setup stream first
            await setupStream(currentChatId);
            
            // Then trigger AI
            const aiResponse = await triggerAI(message, currentChatId);
            if (aiResponse.error) {
                throw new Error(aiResponse.error);
            }

            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
            setError("Failed to send message");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-x-2">
            <Input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={onFocus}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
            />
            <Button type="submit">
                <PaperAirplaneIcon className="h-4 w-4" />
            </Button>
        </form>
    );
};

export default MessageInput;