'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCurrentUser } from '@/hooks/use-current-user';
import { PlusIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { BeatLoader } from "react-spinners";
import ChatTab from './components/chat-tab';
import { useChatStore } from '@/hooks/use-chat-store';
import { getChatHistory } from '@/actions/chat/get-chat-history';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Sidebar = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useCurrentUser();
    const { 
        chats, 
        activeChat, 
        setChats, 
        setActiveChat, 
        setError,
        isSidebarOpen,
        toggleSidebar,
        setMessages
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
            setIsLoading(true);
            const response = await getChatHistory();
            if (response.error) {
                setError(response.error);
                return;
            }
            if (response.chats) {
                setChats(response.chats);
            }
            setIsLoading(false);
        };
        
        loadChats();
    }, [setChats, setError]);

    const handleNewChat = () => {
        setActiveChat(null);
        setMessages([]);
    };

    return (
        <div className="relative h-screen max-h-screen">                
            <div className="px-2">
                <div className={cn(
                    "flex px-2 py-3 gap-2 items-center justify-start rounded-full",
                    !isSidebarOpen && "hidden"
                )}>
                    {user?.image ? (
                        <Image
                            src={user.image}
                            alt="avatar"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-full" />
                    )}
                    <p className="text-black text-sm font-lg leading-none dark:text-white/80">
                        {user?.name?.split(' ')[0]}
                    </p>
                </div>
                {/* Sidebar toggle*/}
                <button
                    onClick={toggleSidebar}
                    className={cn(
                        "absolute top-4 right-4 z-50 p-2 rounded-full",
                        !isSidebarOpen && "hidden"
                    )}
                >
                    <ChevronLeftIcon className="h-5 w-5 text-primary-color dark:text-white/80" />
                </button>
            </div>

            <div className={cn(
                "transition-all overflow-y-auto duration-300 ease-in-out",
                isSidebarOpen ? "w-[260px] min-w-[260px]" : "w-0 min-w-0 hidden"
            )}>
                {isLoading ? (
                    <div className="h-full flex justify-center items-center my-auto">
                        <BeatLoader 
                            size={8}
                            color="var(--primary-color)"
                            speedMultiplier={0.7}
                        />
                    </div>
                ) : (
                    <div className="p-2">
                        <div className="flex flex-col gap-2">

                            <button
                                onClick={handleNewChat}
                                className={cn(
                                    "flex items-center gap-2 p-3 bg-gray-100 w-full rounded-sm transition-colors",
                                    "hover:bg-gray-200",
                                    activeChat === null && "bg-gray-200"
                                )}
                            >
                                <PlusIcon className="h-4 w-4" />
                                <p className="text-black-600 text-sm font-medium leading-none z-10">
                                    New Chat
                                </p>
                            </button>

                            {/* Divider */}
                            <div className="h-px w-full bg-gray-200" />

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
                )}
            </div>
        </div>
    );
};

export default Sidebar;