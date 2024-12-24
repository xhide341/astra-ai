'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/hooks/use-chat-store";
import { createChat } from "@/actions/chat/create-chat";
import { sendMessage, generateAIResponse } from "@/actions/chat/send-message";
import { Input } from "@/components/ui/input";
import { SendMessageResponse } from "@/types/chat";

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
                    
                    const response = await sendMessage(chatResponse.chat.id, message);
                    if (response.error) {
                        setError(response.error);
                        return;
                    }
                    if (response.message) {
                        addMessage(response.message);
                    }

                    // Generate AI response for the new chat
                    const aiResponse: SendMessageResponse = await generateAIResponse(chatResponse.chat.id);
                    if (aiResponse.error) {
                        setError(aiResponse.error);
                        return;
                    }
                    if (aiResponse.assistantMessage) {
                        addMessage(aiResponse.assistantMessage);
                        if (aiResponse.updatedTitle) {
                            updateChatTitle(chatResponse.chat.id, aiResponse.updatedTitle);
                        }
                    }
                }
            } else {
                const response = await sendMessage(activeChat.id, message);
                if (response.error) {
                    setError(response.error);
                    return;
                }
                if (response.message) {
                    addMessage(response.message);
                }

                // Generate AI response for existing chat
                const aiResponse: SendMessageResponse = await generateAIResponse(activeChat.id);
                if (aiResponse.error) {
                    setError(aiResponse.error);
                    return;
                }
                if (aiResponse.assistantMessage) {
                    addMessage(aiResponse.assistantMessage);
                    if (aiResponse.updatedTitle) {
                        updateChatTitle(activeChat.id, aiResponse.updatedTitle);
                    }
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
                <Input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={onFocus}
                    placeholder="Type a message..."
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