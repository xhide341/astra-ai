'use client';

import Conversation from './components/conversation';
import MessageInput from './components/message-input';
import { useChatStore } from '@/hooks/use-chat-store';

const ChatSection = () => {
    const { activeChat, error } = useChatStore();

    return (
        <div className="flex flex-col h-full w-full p-2 bg-gray-100 border-4 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">
                    {activeChat?.title || 'New Chat'}
                </h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <Conversation />
            <MessageInput />
        </div>
    );
};

export default ChatSection;