'use client';

import Sidebar from '@/app/(protected)/chat/_components/sidebar/sidebar';
import ChatSection from '@/app/(protected)/chat/_components/section/chat-section';

const ChatPage = () => {

    return (
        <div className="flex w-full max-w-screen max-h-screen h-screen dark:bg-zinc-900">
            <Sidebar />
            <div className="h-full w-full p-2">
                <ChatSection />
            </div>
        </div>
    );
};

export default ChatPage;
