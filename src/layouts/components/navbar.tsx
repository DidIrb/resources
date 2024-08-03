import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth.context"
import { BoxIcon, GitHubLogoIcon } from "@radix-ui/react-icons"
import { Link, useLocation } from "react-router-dom"
import { SearchBar } from "../../pages/components/search/search.bar"
import { UserDropDown } from "./dropdown"

export const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname
    const isListPage = currentPath === "/dashboard" || currentPath === "/home" || currentPath === "/search";
    const { session } = useAuth();
    return (
        <div className="flex flex-col items-center">
            <div className="h-16 w-full flex justify-between items-center px-4 gap-3">
                <Link to={`${session ? "/dashboard" : currentPath === "/home" ? "/" : "/home"}`} className="flex items-center gap-2 font-bold ml-2 cursor-pointer">
                    <BoxIcon className="h-6 w-6 rotate-45" />
                    Resources</Link>
                <div className="flex gap-1">
                    {isListPage &&
                        <div className="hidden sm:block">
                            <SearchBar />
                        </div>
                    }
                    <Link to="https://github.com/didirb/resources" target="_blank">
                        <Button variant="ghost" className="w-8 rounded-full" size="icon" aria-label="GitHub">
                            <GitHubLogoIcon className="icon" />
                        </Button>
                    </Link>
                    <ModeToggle />
                    {session && <UserDropDown />}
                </div>
            </div>
            {isListPage &&
                <div className="block w-full mb-4 px-6 sm:hidden">
                    <SearchBar />
                </div>
            }
        </div>
    )
}
