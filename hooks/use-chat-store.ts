import { create } from 'zustand';
import { Chat, Message } from '@/types/chat';
import { getMessages } from "@/actions/chat/get-messages";

interface ChatStore {
    // State
    chats: Chat[];
    activeChat: Chat | null;
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    isLoadingConversation: boolean;
    isSidebarOpen: boolean;
    eventSource: EventSource | null;

    // Actions
    setChats: (chats: Chat[]) => void;
    setActiveChat: (chat: Chat | null) => void;
    setMessages: (messages: Message[]) => void;
    addMessages: (messages: Message[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    reset: () => void;
    loadMessages: (chatId: string) => Promise<void>;
    updateChatTitle: (chatId: string, newTitle: string) => void;
    addMessage: (message: Message) => void;
    setIsLoadingConversation: (loading: boolean) => void;
    toggleSidebar: () => void;
    connectToSSE: () => void;
    disconnectFromSSE: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
    // Initial state
    chats: [],
    activeChat: null,
    messages: [],
    isLoading: false,
    error: null,
    isLoadingConversation: false,
    isSidebarOpen: true,
    eventSource: null,

    // Actions
    setChats: (chats) => set({ chats }),
    setActiveChat: async (chat) => {
        set({ activeChat: chat, messages: [], isLoadingConversation: true });
        if (chat) {
            const response = await getMessages(chat.id);
            if (response.messages) {
                set({ messages: response.messages });
            }
            if (response.error) {
                set({ error: response.error });
            }
        }
        set({ isLoadingConversation: false });
    },
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
    }),
    loadMessages: async (chatId) => {
        set({ isLoading: true });
        try {
            const response = await getMessages(chatId);
            if (response.messages) {
                set({ messages: response.messages });
            }
            if (response.error) {
                set({ error: response.error });
            }
        } catch (error) {
            console.error("Error loading messages", error);
            set({ error: "Failed to load messages" });
        } finally {
            set({ isLoading: false });
        }
    },
    updateChatTitle: (chatId, newTitle) => set((state) => ({
        chats: state.chats.map(chat => 
            chat.id === chatId 
                ? { ...chat, title: newTitle }
                : chat
        ),
        activeChat: state.activeChat?.id === chatId 
            ? { ...state.activeChat, title: newTitle }
            : state.activeChat
    })),
    addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
    })),
    setIsLoadingConversation: (loading) => set({ isLoadingConversation: loading }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    connectToSSE: () => {
        const eventSource = new EventSource('/api/chat/sse');
        
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            
            if (data.type === 'titleUpdate') {
                get().updateChatTitle(data.chatId, data.title);
            }
        };

        eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
            eventSource.close();
            set({ eventSource: null });
        };

        set({ eventSource });
    },
    disconnectFromSSE: () => {
        const { eventSource } = get();
        if (eventSource) {
            eventSource.close();
            set({ eventSource: null });
        }
    }
})); 