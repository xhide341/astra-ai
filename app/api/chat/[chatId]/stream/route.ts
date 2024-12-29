import { emitter } from "@/lib/sse";
import { StreamChunk } from "@/types/chat";
import { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: { chatId: string } }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const chatId = await params.chatId;
        console.log("Stream route called for chatId:", chatId);

        const encoder = new TextEncoder();
        const customReadable = new ReadableStream({
            start(controller) {
                const listener = (chunk: StreamChunk) => {
                    const data = `data: ${JSON.stringify(chunk)}\n\n`;
                    controller.enqueue(encoder.encode(data));
                    
                    if (chunk.isComplete) {
                        controller.close();
                        emitter.removeListener(`chat:${chatId}`, listener);
                    }
                };

                emitter.on(`chat:${chatId}`, listener);
            },
            cancel() {
                emitter.removeAllListeners(`chat:${chatId}`);
            }
        });

        return new Response(customReadable, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        console.error("Stream error:", error);
        return new Response('Internal Server Error', { status: 500 });
    }
} 