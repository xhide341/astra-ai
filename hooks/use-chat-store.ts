import { create } from 'zustand';
import { Chat, Message } from '@/types/chat';

interface ChatStore {
    // State
    chats: Chat[];
    activeChat: Chat | null;
    messages: Message[];
    isLoading: boolean;
    error: string | null;

    // Actions
    setChats: (chats: Chat[]) => void;
    setActiveChat: (chat: Chat | null) => void;
    setMessages: (messages: Message[]) => void;
    addMessages: (messages: Message[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    // Initial state
    chats: [],
    activeChat: null,
    messages: [],
    isLoading: false,
    error: null,

    // Actions
    setChats: (chats) => set({ chats }),
    setActiveChat: (chat) => set({ activeChat: chat, messages: [] }),
    setMessages: (messages) => set({ messages }),
    addMessages: (newMessages) => 
        set((state) => ({ 
            messages: [...state.messages, ...newMessages] 
        })),
    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    reset: () => set({ 
        chats: [], 
        activeChat: null, 
        messages: [], 
        isLoading: false, 
        error: null 
    })
})); 