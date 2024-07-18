import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { SearchBar } from "./search.bar"
import { UserDropDown } from "./dropdown"
import { useAuth } from "@/context/auth.context"

export const Navbar = () => {
    const {session } = useAuth();
    return (
        // CREATE ME A SIMPLE NAVBAR THAT IS RESPONSIVE
        <div className="h-16 flex justify-between items-center px-4 gap-3">
            <div className=" text-lg font-bold ml-2">Resources</div>
            <div className="flex gap-1">
                <SearchBar />
                <Button variant="ghost" className="w-8 rounded-full" size="icon">
                    <GitHubLogoIcon className="icon" />
                </Button>
                <ModeToggle />
                {session && <UserDropDown />} 
            </div>
        </div>
    )
}
