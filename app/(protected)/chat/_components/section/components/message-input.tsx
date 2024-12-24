'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/hooks/use-chat-store";
import { createChat } from "@/actions/chat/create-chat";
import { sendMessage, generateAIResponse } from "@/actions/chat/send-message";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { 
        activeChat, 
        isLoading, 
        setIsLoading, 
        setError, 
        addMessage,
        updateChatTitle,
        setActiveChat,
        setChats,
        chats
    } = useChatStore();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;
        
        try {
            setIsLoading(true);
            setError(null);

            // If no active chat, create one first
            if (!activeChat) {
                const chatResponse = await createChat();
                if (chatResponse.error) {
                    setError(chatResponse.error);
                    return;
                }
                if (chatResponse.chat) {
                    setChats([chatResponse.chat, ...chats]);
                    setActiveChat(chatResponse.chat);
                    
                    // Now send the message with the new chat
                    const response = await sendMessage(chatResponse.chat.id, message);
                    if (response.error) {
                        setError(response.error);
                        return;
                    }
                    if (response.message) {
                        addMessage(response.message);
                    }
                }
            } else {
                // Normal message flow for existing chat
                const response = await sendMessage(activeChat.id, message);
                if (response.error) {
                    setError(response.error);
                    return;
                }
                if (response.message) {
                    addMessage(response.message);
                }
            }

            // Generate AI response
            const aiResponse = await generateAIResponse(activeChat?.id || '');
            if (aiResponse.error) {
                setError(aiResponse.error);
                return;
            }
            if (aiResponse.assistantMessage) {
                addMessage(aiResponse.assistantMessage);
                if (aiResponse.updatedTitle) {
                    updateChatTitle(activeChat?.id || '', aiResponse.updatedTitle);
                }
            }

            setMessage("");
            inputRef.current?.focus();
        } catch (error) {
            console.log("Error sending message", error);
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
                <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
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