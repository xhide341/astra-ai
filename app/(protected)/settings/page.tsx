'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { signOut } from 'next-auth/react';

const SettingsPage = () => {
    const user = useCurrentUser();

    return (
    <div>
        {JSON.stringify(user)}
        <form action={() => signOut()}>
            <button className="bg-red-500 text-white p-2 rounded-md" type="submit">Logout</button>
        </form>
    </div>
    )
}

export default SettingsPage;
