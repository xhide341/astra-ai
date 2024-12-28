'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/hooks/use-chat-store";
// import { createChat } from "@/actions/chat/create-chat";
// import { sendMessage } from "@/actions/chat/send-message";
import { Input } from "@/components/ui/input";
import testTrigger from "@/actions/chat/test-trigger";

interface MessageInputProps {
    onFocus: () => void;
}

const MessageInput = ({ onFocus }: MessageInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { 
        // activeChat,
        // chats,
        // setChats,
        // setActiveChat,
        // addMessage,
        setError
    } = useChatStore();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (!message.trim()) return;
        
        try {
            // setIsLoading(true);
            // setError(null);

            // // Create chat if first message
            // if (!activeChat) {
            //     const chatResponse = await createChat();
            //     if (chatResponse.error) {
            //         setError(chatResponse.error);
            //         return;
            //     }
            //     if (chatResponse.chat) {
            //         setChats([chatResponse.chat, ...chats]);
            //         setActiveChat(chatResponse.chat);
                    
            //         const response = await sendMessage(chatResponse.chat.id, message);
            //         if (response.error) {
            //             setError(response.error);
            //             return;
            //         }
            //         if (response.message) {
            //             addMessage(response.message);
            //         }
            //     }
            // } else {
            //     // Send message in existing chat
            //     const response = await sendMessage(activeChat.id, message);
            //     if (response.error) {
            //         setError(response.error);
            //         return;
            //     }
            //     if (response.message) {
            //         addMessage(response.message);
            //     }
            // }

            // Temporarily just trigger chatWithGraph
            testTrigger("Where is the best place to visit in the world?", "test-chat-id");
            
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