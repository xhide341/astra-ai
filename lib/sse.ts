import { EventEmitter } from 'events';
import { StreamChunk } from "@/types/chat";

// Create a global emitter for SSE events
export const emitter = new EventEmitter();
emitter.setMaxListeners(100); // Adjust based on expected concurrent users

// Create an SSE stream for a specific chat
export function createSSEStream(chatId: string) {
    return new ReadableStream({
        start(controller) {
            // Handle incoming messages for this chat
            const onMessage = (data: StreamChunk) => {
                if (data.chatId === chatId) {
                    const message = `data: ${JSON.stringify(data)}\n\n`;
                    controller.enqueue(new TextEncoder().encode(message));
                }
            };

            emitter.on('message', onMessage);

            // Cleanup when stream closes
            return () => {
                emitter.off('message', onMessage);
            };
        }
    });
} 