import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useApp } from "@/context/app.context"
import { useAuth } from "@/context/auth.context"
import { BoxIcon, GitHubLogoIcon, ReloadIcon } from "@radix-ui/react-icons"
import { SearchBar } from "../../pages/components/search.bar"
import { UserDropDown } from "./dropdown"
import { Link } from "react-router-dom"

export const Navbar = () => {
    const { session } = useAuth();
    const { openEditForm, isLoading, fetchData } = useApp()
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
                    {session &&
                        <div className="flex gap-2 items-center">
                            <Button className="h-8 px-2 rounded-full" onClick={fetchData} variant="outline" >
                                {isLoading ?
                                    <ReloadIcon className={`icon ${isLoading ? 'animate-spin infinite' : ''} cursor-pointer`} />
                                    :
                                    "Reload"
                                }
                            </Button>
                            <Button className="h-8 px-2 rounded-full" onClick={() => openEditForm(null)} variant={"outline"}>
                                {/* <PlusCircledIcon  className="icon"/>  */}
                                Create
                            </Button>
                        </div>


                    }

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
