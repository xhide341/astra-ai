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
        setMessages,
        setIsSidebarLoading,
        setIsCompact
    } = useChatStore();

    const [isInitialLoad, setIsInitialLoad] = useState(true);

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
            if (!isInitialLoad) return; // Only run on initial mount
            
            setIsLoading(true);
            setIsSidebarLoading(true);
            
            try {
                const response = await getChatHistory();
                if (response.error) {
                    setError(response.error);
                    return;
                }
                if (response.chats) {
                    setChats(response.chats);
                }
            } catch (error) {
                setError(`Failed to load chats: ${error}`);
            } finally {
                setIsLoading(false);
                setIsSidebarLoading(false);
                setIsInitialLoad(false);
            }
        };
        
        loadChats();
    }, [setChats, setError, setIsSidebarLoading, isInitialLoad]);

    const handleNewChat = () => {
        setMessages([]);
        setIsSidebarLoading(false);
        setIsCompact(true);
        setActiveChat(null);
    };

    return (
        <div className={cn(
            "relative h-screen overflow-y-auto transition-all duration-300 ease-in-out flex-shrink-0",
            isSidebarOpen ? "w-[270px] flex-shrink-0 opacity-100" : "w-0"
        )}>
            <div className="px-2">
                <div className={cn(
                    "flex px-2 pt-4 pb-2 gap-2 items-center justify-start rounded-full transition-all duration-300 ease-in-out",
                    isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
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
                        "absolute top-4 right-4 z-50 pt-2 rounded-full",
                        isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                >
                    <ChevronLeftIcon className="h-5 w-5 text-slate-500 hover:text-slate-900 dark:text-white/90 dark:hover:text-white" />
                </button>
            </div>

            <div className={cn(
                "transition-all duration-300 ease-in-out flex-shrink-0",
                isSidebarOpen 
                    ? "w-[254px] flex-shrink-0 opacity-100" 
                    : "w-0 opacity-0 pointer-events-none"
            )}>
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <BeatLoader 
                            size={8}
                            color="var(--primary-color)"
                            speedMultiplier={0.7}
                        />
                    </div>
                ) : (
                    <div className="p-2">
                        <div className={cn(
                            "flex flex-col gap-2 transition-all duration-300 ease-in-out",
                            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}>
                            <button
                                onClick={handleNewChat}
                                className="flex items-center gap-2 p-3 bg-primary-color hover:bg-secondary-color w-full rounded-sm transition-colors">
                                <PlusIcon className="h-4 w-4 text-white/90 dark:text-white/80" />
                                <p className="text-white/90 dark:text-white/80 text-sm font-medium leading-none z-10">
                                    New Chat
                                </p>
                            </button>

                            {/* Divider */}
                            <div className="h-px w-full bg-gray-200 dark:bg-zinc-800" />

                            {/* Chat sections with transitions */}
                            <div className="transition-all duration-300 ease-in-out">
                                {todayChats.length > 0 && (
                                    <>
                                        <p className="text-xs font-semibold text-gray-500 px-3 pt-2 pb-1">Today</p>
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
                                        <p className="text-xs font-semibold text-gray-500 px-3 pt-2 pb-1">Last 7 Days</p>
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
                                        <p className="text-xs font-semibold text-gray-500 px-3 pt-2 pb-1">Older</p>
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;