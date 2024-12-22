'use client';

import Sidebar from '@/app/(protected)/chat/_components/sidebar';
import Section from '@/app/(protected)/chat/_components/section';


const ChatPage = () => {
    return (
        <div className="h-screen flex">
            <div className="w-80 border-r border-gray-200 h-full">
                <Sidebar />
            </div>
            <div className="flex-1">
                <Section />
            </div>
        </div>
    )
}

export default ChatPage;
