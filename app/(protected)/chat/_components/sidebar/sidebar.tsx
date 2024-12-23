'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/use-current-user';
import { PlusIcon } from '@heroicons/react/24/solid';
import ChatTab from './components/chat-tab';

interface ChatHistory {
    id: string;
    title: string;
}

const Sidebar = () => {
    const user = useCurrentUser();
    const avatar = user?.image;
    const name = user?.name?.split(' ')[0];
    const email = user?.email;
    
    // State for managing chat history and active chat
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
    const [activeChat, setActiveChat] = useState<string | null>(null);

    // Handle new chat creation
    const handleNewChat = () => {
        const newChat = {
            id: Date.now().toString(),
            title: 'New Chat'
        };
        setChatHistory(prev => [newChat, ...prev]);
        setActiveChat(newChat.id);
    };

    return (
        <div className="w-[260px] min-w-[260px] h-full overflow-y-auto draggable p-2">
            <div className="flex flex-col gap-2">
                {/* Avatar section - unchanged */}
                <div className="flex gap-1 p-3 items-center justify-center rounded-full">
                    {avatar ? (
                        <Image src={avatar} alt="avatar" width={54} height={54} className="rounded-full" />
                    ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full" />
                    )}
                    <div className="flex flex-col items-start justify-center text-start gap-1">
                        <p className="text-black text-sm font-semibold leading-none">{name}</p>
                        <p className="text-gray-500 text-xs font-light leading-none">{email}</p>
                    </div>
                </div>
                
                {/* Divider */}
                <div className="flex items-center justify-center w-full h-px bg-gray-200 rounded-full" />
                
                {/* New chat button */}
                <button 
                    className="flex items-center justify-center gap-2 p-3 bg-gray-100 w-full rounded-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    onClick={handleNewChat}
                >
                    <p className="text-black text-sm font-medium leading-none">New Chat</p>
                    <PlusIcon className="text-gray-800 w-4 h-4"/>
                </button>
                
                {/* Divider */}
                <div className="flex items-center justify-center w-full h-px bg-gray-200 rounded-full" />
                
                {/* Chat history section */}
                {chatHistory.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <p className="text-start text-black text-xs font-medium leading-none mt-2 mb-1">Today</p>
                        <div className="flex flex-col gap-1">
                            {chatHistory.map((chat) => (
                                <ChatTab
                                    key={chat.id}
                                    title={chat.title}
                                    isActive={activeChat === chat.id}
                                    onClick={() => setActiveChat(chat.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Past 7 days history section */}
                {chatHistory.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <p className="text-start text-black text-xs font-medium leading-none mt-2 mb-1">Past 7 days</p>
                        <div className="flex flex-col gap-1">
                            {chatHistory.map((chat) => (
                                <ChatTab
                                    key={chat.id}
                                    title={chat.title}
                                    isActive={activeChat === chat.id}
                                    onClick={() => setActiveChat(chat.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default Sidebar;