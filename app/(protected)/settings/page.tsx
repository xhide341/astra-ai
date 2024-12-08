import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
    const session = await auth();

    async function logout() {
        "use server";
        await signOut();
    }

    return <div>
        {JSON.stringify(session, null, 2)}
        <form action={logout}>
            <button className="bg-red-500 text-white p-2 rounded-md" type="submit">Logout</button>
        </form>
    </div>
}

export default SettingsPage;
