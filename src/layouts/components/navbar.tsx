import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth.context"
import { BoxIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"
import { SearchBar } from "../../pages/components/search.bar"
import { UserDropDown } from "./dropdown"

export const Navbar = () => {
    const { session } = useAuth();
    return (
        <div className="flex flex-col items-center">
            <div className="h-16 w-full flex justify-between items-center px-4 gap-3">
                <Link to={`${session ? "/dashboard" : "/home"}`} className="flex items-center gap-2 font-bold ml-2 cursor-pointer">
                    <BoxIcon className="h-6 w-6 rotate-45" />
                    Resources</Link>
                <div className="flex gap-1">
                    <div className="hidden sm:block">
                        <SearchBar />
                    </div>                
                    <Button variant="ghost" className="w-8 rounded-full" size="icon">
                        <GitHubLogoIcon className="icon" />
                    </Button>
                    <ModeToggle />
                    {session && <UserDropDown />}
                </div>
            </div>
            <div className="block w-full mb-4 px-6 sm:hidden">
                <SearchBar />
            </div>
        </div>
    )
}
