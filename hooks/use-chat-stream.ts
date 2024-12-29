import { useEffect } from 'react';
import { useChatStore } from './use-chat-store';

export const useChatStream = (chatId: string) => {
  const { addMessage, setError } = useChatStore();

  useEffect(() => {
    if (!chatId) return;

    const eventSource = new EventSource(`/api/chat/stream?chatId=${chatId}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
          addMessage(data.message);
        }
      } catch (error) {
        console.error('Error parsing SSE message:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      setError('Connection error occurred');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [chatId, addMessage, setError]);
}; 