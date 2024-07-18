import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/layouts/components/navbar"
import { CalendarDays, Globe } from "lucide-react"
import { HoverCardDemo } from "./components/card"

export const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="container pb-3">
                List of useful Resources
                <HoverCardDemo />
                <div className="border shadow-sm w-80 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-7 h-7">
                            <AvatarImage  src="https://github.com/vercel.png" />
                            <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <h4 className="font-semibold">@nextjs</h4>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm">
                            The React Framework - created and maintained by @vercel.
                        </p>
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex">
                                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                <span className="text-xs text-muted-foreground">
                                    December 2021
                                </span>
                            </div>
                            <span className="text-muted-foreground text-xs items-center flex gap-1">
                                <Globe className="icon-link"/>
                                Website
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}