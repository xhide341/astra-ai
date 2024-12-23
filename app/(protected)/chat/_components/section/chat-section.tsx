'use client';

import Conversation from './components/conversation';
import MessageInput from './components/message-input';

const ChatSection = () => {

    /* TODO:
        1. Add state management
        2. Implement message sending logic
        3. Handle loading states
        4. Add error handling
    */
    return (
        <div className="flex flex-col h-full w-full p-2 bg-gray-100 border-4 border-gray-200 rounded-xl">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Chat</h2>
            </div>
            <Conversation 
                messages={[]} 
                isLoading={false}
            />
            <MessageInput 
                onSubmit={() => {}}
                isLoading={false}
            />
        </div>
    );
};

export default ChatSection;