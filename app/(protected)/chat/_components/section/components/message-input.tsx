'use client';

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
    onSubmit: (message: string) => void;
    isLoading?: boolean;
}

const MessageInput = ({
    onSubmit,
    isLoading
}: MessageInputProps) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;
        
        onSubmit(message);
        setMessage("");
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className="border-t p-4"
        >
            <div className="flex items-center gap-x-2">
                <input
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