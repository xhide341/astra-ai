'use client';

import { Button } from "@/components/ui/button";

interface LogOutProps {
    onLogout: () => void;
}

export default function LogOut({ onLogout }: LogOutProps) {
    return (
        <div className="w-full">
            <Button
                className="w-full text-white dark:text-white/90 bg-red-500 hover:bg-red-600"
                onClick={onLogout}
            >
                Log out
            </Button>
        </div>
    );
}
