import { Alert } from "@/components/custom/alert.dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth.context";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const UserDropDown = () => {
    const { session, signout } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const logout = async () => {
        try {
            const res = await signout();
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Error signing out");
        }
    }
    return (
        <div>
            <Alert
                title="Confirm Signout"
                message="Are you sure you want to Sign out? Any unsaved changes will be lost.?"
                onConfirm={() => logout()}
                onCancel={() => setIsDialogOpen(false)} // Pass the cancel handler
                isOpen={isDialogOpen}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full h-8 w-8">
                        <Avatar>
                            <AvatarImage src={session?.avatar} />
                            <AvatarFallback>{session.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>
                        Manage Resources
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {(session?.role === "super_admin" || session?.role === "admin") &&
                        <Link to="/dashboard">
                            <DropdownMenuItem className="cursor-pointer" >Dashboard</DropdownMenuItem>
                        </Link>
                    }
                    {session?.role === "user"  &&
                        <Link to="/home">
                            <DropdownMenuItem className="cursor-pointer" >Home</DropdownMenuItem>
                        </Link>
                    }
                    {session?.role === "super_admin" &&
                        <Link to="/users">
                            <DropdownMenuItem className="cursor-pointer">Users</DropdownMenuItem>
                        </Link>
                    }
                    <Link to="/settings">
                        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="cursor-pointer">Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
