import { Alert } from "@/components/custom/alert.dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth.context";
import { useState } from "react";

export const UserDropDown = () => {
    const { session } = useAuth();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const signout = () => {

    }
    return (
        <div>
            <Alert
                title="Confirm Signout"
                message="Are you sure you want to Sign out? Any unsaved changes will be lost.?"
                onConfirm={() => signout()}
                onCancel={() => setIsDialogOpen(false)} // Pass the cancel handler
                isOpen={isDialogOpen}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="flex gap-3 items-center">
                        { session?.user?.email || "randomemail@mail.com"} 
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
