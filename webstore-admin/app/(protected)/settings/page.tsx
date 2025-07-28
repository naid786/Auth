"use client";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";


const SettingsPage = () => {

    const session = useCurrentUser();

    const onClick = () => {
        logout();
    }
    return (
        <div>
            <div className="bg-white p-10 rounded-xl">
                <button onClick={onClick} type='submit'>
                    Sign out
                </button>
            </div>
            
        </div>
    );
}

export default SettingsPage;