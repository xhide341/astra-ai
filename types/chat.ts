import { MessageRole } from "@prisma/client";

// Chat Types
export interface Chat {
    id: string;
    title: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

// Message Types
export interface Message {
    id: string;
    content: string;
    role: MessageRole;
    chatId: string;
    createdAt: Date;
    updatedAt: Date;
}
                             
// API Response Types
export interface ApiResponse {
    error?: string;
    success?: string;
}

export interface CreateChatResponse extends ApiResponse {
    chat?: Chat;
}

export interface SendMessageResponse extends ApiResponse {
    message?: Message;
    teacherMessages?: Message[];
    facilitatorMessages?: Message[];
}

export interface GetChatsResponse extends ApiResponse {
    chats?: Chat[];
}

export interface GetMessagesResponse extends ApiResponse {
    messages?: Message[];
}

// Component Props Types
export interface ChatSectionProps {
    initialChat?: Chat;
}

export interface ConversationProps {
    messages: Message[];
    isLoading: boolean;
}

export interface MessageInputProps {
    onSubmit: (content: string) => Promise<void>;
    isLoading: boolean;
}

export interface ChatTabProps {
    chat: Chat;
    isActive: boolean;
    onClick: () => void;
}

export interface StreamChunk {
    type: 'stream-chunk';
    role: MessageRole;
    content: string;
    chatId: string;
    isComplete: boolean;
}

export interface UIUpdate {
    type: 'newMessage';
    id: string;
    content: string;
    role: MessageRole;
    chatId: string;
}
