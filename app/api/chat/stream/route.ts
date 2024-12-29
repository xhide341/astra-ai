import { NextRequest } from "next/server";

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  // Get chatId from URL params
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get('chatId');

  if (!chatId) {
    return new Response('Chat ID required', { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  // Start background processing
  (async () => {
    try {
      // Send initial connection message
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ 
          type: 'connection', 
          status: 'connected',
          chatId 
        })}\n\n`)
      );

      // Keep connection alive with ping every 30 seconds
      const keepAlive = setInterval(async () => {
        await writer.write(
          encoder.encode(`data: ${JSON.stringify({ 
            type: 'ping', 
            time: new Date().toISOString(),
            chatId 
          })}\n\n`)
        );
      }, 30000);

      // Clean up on close
      req.signal.addEventListener('abort', () => {
        clearInterval(keepAlive);
        writer.close();
      });

    } catch (error) {
      console.error('Stream error:', error);
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ 
          type: 'error', 
          error: 'Stream error occurred',
          chatId 
        })}\n\n`)
      );
      writer.close();
    }
  })();

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}