"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function LogOut() {

    return <div className="w-full">
        <Button className="w-full shadow-none" onClick={() => {
            signOut();
        }}>
            Log out
        </Button>
    </div>
}
