'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/use-current-user';
import { PlusIcon } from "@heroicons/react/24/outline";
import ChatTab from './components/chat-tab';
import { useChatStore } from '@/hooks/use-chat-store';
import { createChat } from '@/actions/chat/create-chat';
import { getChatHistory } from '@/actions/chat/get-chat-history';
import { format } from 'date-fns';

const Sidebar = () => {
    const user = useCurrentUser();
    const { 
        chats, 
        activeChat, 
        setChats, 
        setActiveChat, 
        setError 
    } = useChatStore();

    // Filter chats by date
    const today = new Date();
    const todayChats = chats.filter(chat => 
        format(new Date(chat.createdAt), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
    );

    const lastWeekChats = chats.filter(chat => {
        const chatDate = new Date(chat.createdAt);
        const diffTime = Math.abs(today.getTime() - chatDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7 && !todayChats.includes(chat);
    });

    const olderChats = chats.filter(chat => 
        !todayChats.includes(chat) && !lastWeekChats.includes(chat)
    );

    useEffect(() => {
        const loadChats = async () => {
            const response = await getChatHistory();
            if (response.error) {
                setError(response.error);
                return;
            }
            if (response.chats) {
                setChats(response.chats);
            }
        };
        
        loadChats();
    }, [setChats, setError]);

    const handleNewChat = async () => {
        const response = await createChat();
        if (response.error) {
            setError(response.error);
            return;
        }
        if (response.chat) {
            setChats([response.chat, ...chats]);
            setActiveChat(response.chat);
        }
    };

    return (
        <div className="w-[260px] min-w-[260px] h-full overflow-y-auto p-2">
            <div className="flex flex-col gap-2">
                <div className="flex gap-1 p-3 items-center justify-center rounded-full">
                    {user?.image ? (
                        <Image 
                            src={user.image} 
                            alt="avatar" 
                            width={54} 
                            height={54} 
                            className="rounded-full" 
                        />
                    ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full" />
                    )}
                    <div className="flex flex-col items-start justify-center text-start gap-1">
                        <p className="text-black text-sm font-semibold leading-none">
                            {user?.name?.split(' ')[0]}
                        </p>
                        <p className="text-gray-500 text-xs font-light leading-none">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleNewChat}
                    className="flex items-center gap-2 p-3 bg-gray-100 w-full rounded-sm hover:bg-gray-200 transition-colors"
                >
                    <PlusIcon className="h-4 w-4" />
                    <p className="text-black text-sm font-medium leading-none">
                        New Chat
                    </p>
                </button>

                {/* Today's chats */}
                {todayChats.length > 0 && (
                    <>
                        <p className="text-xs font-semibold text-gray-500 px-3 pt-2">Today</p>
                        <div className="flex flex-col gap-1">
                            {todayChats.map((chat) => (
                                <ChatTab
                                    key={chat.id}
                                    title={chat.title}
                                    isActive={activeChat?.id === chat.id}
                                    onClick={() => setActiveChat(chat)}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Last 7 days chats */}
                {lastWeekChats.length > 0 && (
                    <>
                        <p className="text-xs font-semibold text-gray-500 px-3 pt-2">Last 7 Days</p>
                        <div className="flex flex-col gap-1">
                            {lastWeekChats.map((chat) => (
                                <ChatTab
                                    key={chat.id}
                                    title={chat.title}
                                    isActive={activeChat?.id === chat.id}
                                    onClick={() => setActiveChat(chat)}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Older chats */}
                {olderChats.length > 0 && (
                    <>
                        <p className="text-xs font-semibold text-gray-500 px-3 pt-2">Older</p>
                        <div className="flex flex-col gap-1">
                            {olderChats.map((chat) => (
                                <ChatTab
                                    key={chat.id}
                                    title={chat.title}
                                    isActive={activeChat?.id === chat.id}
                                    onClick={() => setActiveChat(chat)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;