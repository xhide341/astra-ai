import { NextRequest } from "next/server";
import { chatWithGraph } from "@/lib/langchain/graph";
import { StreamChunk } from "@/types/chat";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  try {
    // 1. Auth check
    const session = await auth();
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    // 2. Validate request body
    const body = await req.json().catch(() => null);
    if (!body) {
      throw new Error('Invalid request body');
    }

    const { message, chatId } = body;
    if (!message || typeof message !== 'string') {
      throw new Error('Message is required and must be a string');
    }
    if (!chatId || typeof chatId !== 'string') {
      throw new Error('ChatId is required and must be a string');
    }

    // 3. Process in background
    (async () => {
      try {
        console.log("Starting AI processing");
        await chatWithGraph(message, chatId, async (chunk: StreamChunk) => {
          console.log("Sending chunk:", chunk);
          await writer.write(
            encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
          );
        });
      } catch (error) {
        // AI processing error
        const errorMessage: StreamChunk = {
          type: 'error',
          error: error instanceof Error ? error.message : 'AI processing failed',
          chatId
        };
        await writer.write(
          encoder.encode(`data: ${JSON.stringify(errorMessage)}\n\n`)
        );
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    // Request validation errors
    const errorMessage: StreamChunk = {
      type: 'error',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      chatId: 'unknown'
    };

    await writer.write(
      encoder.encode(`data: ${JSON.stringify(errorMessage)}\n\n`)
    );
    await writer.close();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  }
} 