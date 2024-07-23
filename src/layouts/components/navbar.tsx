import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, PlusCircledIcon, ReloadIcon } from "@radix-ui/react-icons"
import { SearchBar } from "../../pages/components/search.bar"
import { UserDropDown } from "./dropdown"
import { useAuth } from "@/context/auth.context"
import { useApp } from "@/context/app.context"

export const Navbar = () => {
    const { session } = useAuth();
    const {openEditForm, isLoading,  fetchData} = useApp()
    return (
        <div className="flex flex-col items-center">
            <div className="h-16 w-full flex justify-between items-center px-4 gap-3">
                <div className=" text-lg font-bold ml-2">Resources</div>
                <div className="flex gap-1">
                    <div className="hidden sm:block">
                        <SearchBar />
                    </div>
                    <Button className="h-8 w-8 rounded-full" size="icon" onClick={() => openEditForm(null)} variant={"ghost"}>
                        <PlusCircledIcon className="icon" />
                    </Button>
                    <Button className="h-8 w-8 rounded-full" variant="ghost" size="icon">
                        <ReloadIcon onClick={fetchData} className={`icon ${isLoading ? 'animate-spin infinite' : ''} cursor-pointer`} />
                    </Button>
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
