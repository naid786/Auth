"use client"

import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "./logout-button";
import { LogOut, Settings2Icon } from "lucide-react"
import { SettingsModal } from "../SettingsModal";

export const UserButton = () => {
    const user = useCurrentUser();

    return(
        <DropdownMenu >
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="bg-gray-400">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <SettingsModal>
                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <Settings2Icon className="h-4 w-4 mr-2" />
                        Settings
                    </DropdownMenuItem>
                </SettingsModal>
                <LogoutButton>
                    <DropdownMenuItem >
                        <LogOut className="h-4 w-4 mr-2"/>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}