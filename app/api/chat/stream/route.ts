import { createSSEStream } from '@/lib/sse';
import { auth } from '@/auth';

export async function GET(req: Request) {
    // Check if user is authenticated
    const session = await auth();
    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 });
    }

    // Get chatId from URL (like /api/chat/stream?chatId=123)
    const url = new URL(req.url);
    const chatId = url.searchParams.get('chatId') || 'new-chat';
    
    console.log("Creating stream for chatId:", chatId);
    const stream = createSSEStream(chatId);
    
    // Tell the browser this is a special streaming connection
    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    });
} 