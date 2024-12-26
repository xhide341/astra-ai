import { auth } from "@/auth";
import db from "@/lib/db";
import { emitter } from "@/lib/events";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const stream = new ReadableStream({
            start(controller) {
                const encoder = new TextEncoder();
                let lastCheck = new Date();
                
                const sendEvent = (data: string) => {
                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                };

                // Title updates watcher
                const watchTitleUpdates = async () => {
                    try {
                        const interval = setInterval(async () => {
                            const updatedChat = await db.chat.findFirst({
                                where: {
                                    userId: session.user.id,
                                    updatedAt: { gt: lastCheck }
                                },
                                select: {
                                    id: true,
                                    title: true
                                }
                            });

                            if (updatedChat) {
                                sendEvent(JSON.stringify({
                                    type: 'titleUpdate',
                                    chatId: updatedChat.id,
                                    title: updatedChat.title
                                }));
                                lastCheck = new Date();
                            }
                        }, 2000);

                        req.signal.addEventListener('abort', () => {
                            clearInterval(interval);
                        });
                    } catch (error) {
                        console.error('SSE Watch error:', error);
                    }
                };

                // Listen for UI updates from the graph action
                emitter.on('ui-update', (update) => {
                    console.log("SSE: Received UI update:", update);
                    sendEvent(JSON.stringify(update));
                });

                console.log("SSE: Connection established");

                watchTitleUpdates();

                req.signal.addEventListener('abort', () => {
                    console.log("SSE: Connection aborted");
                    emitter.removeAllListeners('ui-update');
                });
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        console.error('SSE Error:', error);
        return new Response('Error', { status: 500 });
    }
} 