'use client';

interface ChatTabProps {
    title: string;
    isActive?: boolean;
    onClick: () => void;
}

const ChatTab = ({ title, isActive, onClick }: ChatTabProps) => {
    return (
        <button
            onClick={onClick}
            className={`
                flex items-center gap-2 p-3 bg-gray-100 w-full rounded-sm transition-colors cursor-pointer
                ${isActive 
                    ? 'bg-gray-200 hover:bg-gray-300' 
                    : 'hover:bg-gray-200'
                }
            `}
        >
            <p className="text-black text-sm font-medium leading-none">
                {title}
            </p>
        </button>
    );
};

export default ChatTab;
