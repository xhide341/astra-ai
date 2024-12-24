'use client';

import { Bars3Icon } from "@heroicons/react/24/outline";
import Conversation from './components/conversation';
import MessageInput from './components/message-input';
import { useChatStore } from '@/hooks/use-chat-store';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'motion/react';

const ChatSection = () => {
    const { activeChat, error, isSidebarOpen, toggleSidebar } = useChatStore();
    const isCompactView = !activeChat;

    return (
        <div className="flex flex-col h-full w-full p-2 bg-gray-100 border-4 border-gray-200 rounded-xl">
            <AnimatePresence mode="wait">
                {isCompactView ? (
                    <motion.div 
                        key="compact"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col h-full relative"
                    >
                        <button
                            onClick={toggleSidebar}
                            className={cn(
                                "absolute top-2 left-2 p-2 hover:bg-gray-200 rounded-full",
                                isSidebarOpen && "hidden"
                            )}
                        >
                            <Bars3Icon className="h-5 w-5" />
                        </button>
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="w-full max-w-md space-y-6">
                                <h1 className="text-2xl font-semibold text-center text-gray-800">
                                    What do you want to learn?
                                </h1>
                                <MessageInput onFocus={() => {}} />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="expanded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col h-full"
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <div className="flex items-center gap-x-3">
                                <button
                                    onClick={toggleSidebar}
                                    className={cn(
                                        "p-2 hover:bg-gray-200 rounded-full",
                                        isSidebarOpen && "hidden"
                                    )}
                                >
                                    <Bars3Icon className="h-5 w-5" />
                                </button>
                                <h2 className="text-xl font-semibold">
                                    {activeChat?.title || 'New Chat'}
                                </h2>
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="w-full max-w-2xl flex flex-col">
                                <div className="flex-1 overflow-y-auto">
                                    <Conversation />
                                </div>
                                <MessageInput onFocus={() => {}} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatSection;