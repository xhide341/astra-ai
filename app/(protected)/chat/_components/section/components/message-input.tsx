'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { ShieldExclamationIcon } from "@heroicons/react/20/solid";
import { FormEvent, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/hooks/use-chat-store";
import { createChat } from "@/actions/chat/create-chat";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/actions/chat/send-message";
import { showToast } from '@/lib/toast';

interface MessageInputProps {
    onFocus: () => void;
}

const MessageInput = ({ onFocus }: MessageInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");
    const { 
        activeChat,
        messages,
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
        setIsCompact,
        isCompact,
        isSidebarLoading,
        isStreaming
    } = useChatStore();

    // Check if first message is from user
    const isFirstMessageFromUser = messages.length > 0 && messages[0].role === 'USER';
    const isDisabled = isLoading || isStreaming || (isCompact && isSidebarLoading) || isFirstMessageFromUser;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim() || isStreaming) return;
        
        try {
            setIsLoading(true);
            setError(null);

            // Create chat if needed
            let currentChatId = activeChat?.id;
            if (!currentChatId) {
                const initialTitle = message.slice(0, 50) + (message.length > 50 ? "..." : "");
                const chatResponse = await createChat(initialTitle);
                
                if (chatResponse.error) {
                    showToast.error(chatResponse.error);
                    setIsLoading(false);
                    return;
                }
                
                if (!chatResponse.chat) {
                    showToast.error("Failed to create chat");
                    setIsLoading(false);
                    return;
                }
                
                setChats([chatResponse.chat, ...chats]);
                await setActiveChat(chatResponse.chat);
                setIsCompact(false);
                currentChatId = chatResponse.chat.id;
                showToast.success("New chat created");
            }
            
            const response = await sendMessage(currentChatId, message);
            if (response.error) {
                throw new Error(response.error);
            }

            // Load messages after saving
            await loadMessages(currentChatId);

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

            if (!streamResponse.ok) {
                const errorData = await streamResponse.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

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
            setError("Failed to send message");
            showToast.error(error instanceof Error ? error.message : "Failed to send message");
        } finally {
            stopStreaming();
            setIsLoading(false);
            setMessage("");
        }
    };

    return (
        <div className="flex flex-col gap-2">
            {isFirstMessageFromUser && (
                <div className="flex items-center gap-1.5 justify-center h-full w-full">
                    <ShieldExclamationIcon className="h-3 w-3 text-yellow-500" />
                    <p className="text-xs text-gray-700 dark:text-white/70">Conversation is limited to one prompt to limit token usage.</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex gap-x-2">
                <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={onFocus}
                    placeholder="Enter a topic..."
                    disabled={isDisabled}
                    className="text-sm flex-1 bg-white/90 dark:bg-zinc-900/75 dark:backdrop-blur-md dark:border-zinc-800 text-black-600 dark:text-white/90 placeholder:text-gray-600 dark:placeholder:text-white/70"
                />
                <Button 
                    type="submit" 
                    disabled={isDisabled}
                    className="disabled:opacity-50 disabled:cursor-not-allowed bg-primary-color hover:bg-secondary-color"
                >
                    <PaperAirplaneIcon className="h-3 w-3 text-white/80" />
                </Button>
            </form>
        </div>
    );
};

export default MessageInput;