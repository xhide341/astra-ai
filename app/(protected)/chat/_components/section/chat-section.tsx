'use client';

import { Bars3Icon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Conversation from './components/conversation';
import MessageInput from './components/message-input';
import { useChatStore } from '@/hooks/use-chat-store';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'motion/react';

const ChatSection = () => {
    const { activeChat, error, isSidebarOpen, toggleSidebar } = useChatStore();
    const isCompactView = !activeChat;

    return (
        <div className="flex flex-col h-full w-full p-2 bg-gray-300 dark:bg-zinc-700 border-0 rounded-xl">
            <AnimatePresence mode="wait">
                {isCompactView ? (
                    <motion.div 
                        key="compact"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col h-full relative"
                    >
                        <div className="absolute top-2 right-2 z-10">
                            <ThemeToggle />
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className={cn(
                                "absolute top-2 left-2 p-2 rounded-full",
                                isSidebarOpen && "hidden"
                            )}
                        >
                            <Bars3Icon className="h-5 w-5 text-slate-500 hover:text-slate-900 dark:text-white/90 dark:hover:text-white" />
                        </button>
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="w-full max-w-md">
                                <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white/90 mb-4">
                                    Enter a topic
                                </h1>
                                <p className="text-slate-800 dark:text-white/90 text-xs font-regular mx-auto mb-6 text-center">
                                    Please use a topic that is for educational purposes only.
                                </p>
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
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-800">
                            <button
                                onClick={toggleSidebar}
                                className={cn(
                                    "p-2 rounded-full items-center justify-start",
                                    isSidebarOpen && "opacity-0 pointer-events-none"
                                )}
                            >
                                <Bars3Icon className="h-5 w-5 text-slate-500 hover:text-slate-900 dark:text-white/90 dark:hover:text-white" />
                            </button>
                            <h2 className="px-6 max-w-2xl w-full text-xl font-semibold mx-auto text-start text-black-600 dark:text-white/90 flex items-center gap-2">
                                <ChatBubbleLeftIcon className="h-6 w-6" />
                                {activeChat?.title || 'New Chat'}
                            </h2>
                            <div className="flex items-center gap-4">
                                <ThemeToggle />
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center items-center overflow-y-auto">
                            <div className="w-full max-w-2xl flex flex-col h-full max-h-full">
                                <Conversation />
                            </div>
                        </div>
                        <div className="flex justify-center items-center py-4 sticky bottom-0">
                            <div className="w-full max-w-2xl">
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