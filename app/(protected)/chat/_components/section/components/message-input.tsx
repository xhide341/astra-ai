'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/hooks/use-chat-store";
import { createChat } from "@/actions/chat/create-chat";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/actions/chat/send-message";

interface MessageInputProps {
    onFocus: () => void;
}

const MessageInput = ({ onFocus }: MessageInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");
    const { 
        activeChat,
        chats,
        setChats,
        setActiveChat,
        setError,
        startStreaming,
        handleStreamChunk,
        setIsLoading,
        isLoading,
        loadMessages,
        stopStreaming,
        isSidebarLoading
    } = useChatStore();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;
        
        try {
            setIsLoading(true);
            setError(null);
            console.log("Starting message submission...");

            // Create chat if needed
            let currentChatId = activeChat?.id;
            if (!currentChatId) {
                console.log("Creating new chat...");
                // Use first 50 characters of message as title
                const initialTitle = message.slice(0, 50) + (message.length > 50 ? "..." : "");
                const chatResponse = await createChat(initialTitle);
                if (!chatResponse.chat) {
                    setError("Failed to create chat");
                    return;
                }
                setChats([chatResponse.chat, ...chats]);
                await setActiveChat(chatResponse.chat);
                currentChatId = chatResponse.chat.id;
                console.log("New chat created:", currentChatId);
            }

            // Save user message
            console.log("Saving user message...");
            const response = await sendMessage(currentChatId, message);
            if (response.error) {
                throw new Error(response.error);
            }

            // Load messages after saving
            await loadMessages(currentChatId);
            console.log("User message saved");

            // Start streaming mode
            startStreaming();

            // Send message and handle stream
            const streamResponse = await fetch('/api/chat/trigger', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    chatId: currentChatId
                })
            });

            if (!streamResponse.ok) throw new Error('Failed to send message');

            // Read the stream
            const reader = streamResponse.body?.getReader();
            if (!reader) throw new Error('No reader available');

            while (true) {
                const { done, value } = await reader.read();
                if (done){
                    break;
                }

                // Parse chunks and handle them
                const chunk = new TextDecoder().decode(value);
                const lines = chunk.split('\n\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = JSON.parse(line.slice(5));
                        handleStreamChunk(data);
                    }
                }
            }

            setMessage("");
        } catch (error) {
            stopStreaming();
            console.error("Error sending message:", error);
            setError("Failed to send message");
        } finally {
            stopStreaming();
            setIsLoading(false);
            setMessage("");
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
                disabled={isLoading || isSidebarLoading}
                className="flex-1 bg-white/90 dark:bg-zinc-900/75 dark:backdrop-blur-md dark:border-zinc-800 text-black-600 dark:text-white/90 placeholder:text-gray-600 dark:placeholder:text-white/70"
            />
            <Button type="submit" disabled={isLoading || isSidebarLoading} className="disabled:opacity-50 disabled:cursor-not-allowed bg-primary-color hover:bg-secondary-color">
                <PaperAirplaneIcon className="h-3 w-3 text-white/80" />
            </Button>
        </form>
    );
};

export default MessageInput;