'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/hooks/use-chat-store";
import { sendMessage } from "@/actions/chat/send-message";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { 
        activeChat, 
        isLoading, 
        setIsLoading, 
        setError, 
        addMessages,
        updateChatTitle
    } = useChatStore();

    // Auto-focus and set initial message for new chats
    useEffect(() => {
        if (activeChat) {
            const input = document.querySelector('input');
            input?.focus();
            input?.setSelectionRange(0, input.value.length);
        }
    }, [activeChat]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim() || !activeChat) return;
        
        try {
            setIsLoading(true);
            setError(null);
            
            const response = await sendMessage(activeChat.id, message);
            
            if (response.error) {
                setError(response.error);
                return;
            }

            if (response.message && response.assistantMessage) {
                addMessages([response.message, response.assistantMessage]);
                
                // Update title if provided
                if (response.updatedTitle) {
                    updateChatTitle(activeChat.id, response.updatedTitle);
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
                    disabled={isLoading || !activeChat}
                />
                <Button 
                    type="submit" 
                    size="icon"
                    disabled={isLoading || !message.trim() || !activeChat}
                >
                    <PaperAirplaneIcon className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
};

export default MessageInput;