import { StreamChunk } from "@/types/chat";
import { useChatStore } from "@/hooks/use-chat-store";
import { MessageRole } from "@prisma/client";

export const useChatStream = () => {
    const { addMessages, setError } = useChatStore();

    const setupStream = (chatId: string) => {
        return new Promise<EventSource>((resolve, reject) => {
            const eventSource = new EventSource(`/api/chat/${chatId}/stream`);

            eventSource.onopen = () => {
                console.log("SSE connection established for chatId:", chatId);
                resolve(eventSource);
            };

            eventSource.onerror = (error) => {
                console.error("SSE connection error for chatId:", chatId);
                setError("Connection error");
                eventSource.close();
                reject(error);
            };

            eventSource.onmessage = (event) => {
                try {
                    const chunk = JSON.parse(event.data) as StreamChunk;
                    
                    if (chunk.isComplete) {
                        eventSource.close();
                    }
                    
                    addMessages([{
                        id: Date.now().toString(),
                        content: chunk.content,
                        role: chunk.role.toUpperCase() as MessageRole,
                        chatId: chunk.chatId,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }]);
                } catch (error) {
                    console.error("Error processing SSE message:", error);
                    setError("Error processing message");
                    eventSource.close();
                }
            };
        });
    };

    return { setupStream };
};