import { create } from 'zustand';
import { Chat, Message, StreamChunk } from '@/types/chat';
import { getMessages } from "@/actions/chat/get-messages";
import { MessageRole } from '@prisma/client';
// import { saveMessage } from '@/actions/chat/save-message';

interface ChatStore {
    // State
    chats: Chat[];
    activeChat: Chat | null;
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    isLoadingConversation: boolean;
    isSidebarOpen: boolean;
    isSidebarLoading: boolean;

    // New Streaming State
    isStreaming: boolean;
    currentStreamedContent: string;
    streamRole: string | null;
    previousRole: string | null;

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
    setIsSidebarLoading: (isSidebarLoading: boolean) => void;

    // New Streaming Actions
    startStreaming: () => void;
    stopStreaming: () => void;
    handleStreamChunk: (chunk: StreamChunk) => void;
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
    isSidebarLoading: false,

    // New Streaming State
    isStreaming: false,
    currentStreamedContent: '',
    streamRole: null,
    previousRole: null,

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
    setIsSidebarLoading: (isSidebarLoading) => set({ isSidebarLoading }),
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

    // New Streaming Actions
    startStreaming: () => set({ 
        isStreaming: true, 
        currentStreamedContent: '', 
        error: null 
    }),
    stopStreaming: () => {
        const state = get();
        if (state.currentStreamedContent && state.activeChat) {
            const newMessage: Message = {
                id: Date.now().toString(), // Temporary ID
                content: state.currentStreamedContent,
                role: (state.streamRole as MessageRole) || 'AI',
                chatId: state.activeChat.id,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            state.addMessage(newMessage);
        }
        set({ 
            isStreaming: false, 
            currentStreamedContent: '', 
            streamRole: null 
        });
    },
    handleStreamChunk: async (chunk: StreamChunk) => {
        if (chunk.type === 'error') {
            set({ error: chunk.error, isStreaming: false });
            return;
        }

        if (chunk.type === 'stream') {
            const newRole = chunk.role || null;
            const { previousRole, currentStreamedContent } = get();
            
            // Modified condition to handle first message
            if (newRole !== previousRole && currentStreamedContent) {
                const state = get();
                const newMessage = {
                    id: Date.now().toString(),
                    content: state.currentStreamedContent,
                    role: (state.previousRole || newRole) as MessageRole,
                    chatId: chunk.chatId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                // Update UI state
                state.addMessage(newMessage);
                // Reset streaming state
                set({ 
                    currentStreamedContent: chunk.content || '',
                    streamRole: newRole,
                    previousRole: newRole
                });
            } else {
                // Continue streaming current role
                set((state) => ({ 
                    currentStreamedContent: state.currentStreamedContent + (chunk.content || ''),
                    streamRole: newRole,
                    previousRole: newRole || state.previousRole,
                    isStreaming: true
                }));
            }
        }
    }
}));

useChatStore.subscribe((state) => {
    console.log('Messages:', state.messages);
    console.log('Current Stream:', {
        content: state.currentStreamedContent,
        isStreaming: state.isStreaming,
        streamRole: state.streamRole
    });
}); 