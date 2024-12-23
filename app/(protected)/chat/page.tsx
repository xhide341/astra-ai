'use client';

import Sidebar from '@/app/(protected)/chat/_components/sidebar/sidebar';
import ChatSection from '@/app/(protected)/chat/_components/section/chat-section';


const ChatPage = () => {
    return (
        <div className="flex h-screen w-full max-w-screen">
            <div className="w-[260px] h-full">
                <Sidebar />
            </div>
            <div className="h-full w-full p-2">
                <ChatSection />
            </div>
        </div>
    )
}

export default ChatPage;
