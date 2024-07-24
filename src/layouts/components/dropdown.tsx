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
            // Handle the error
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
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="flex flex-col gap-1">
                        {session?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <Link to="/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
