import { Link, Outlet } from "react-router-dom"
import { Navbar } from "./components/navbar"
import { Button } from "@/components/ui/button"

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <Navbar />
      <div className="px-2 flex-1">
        <Outlet />
      </div>
      <footer className="sm:text-right text-center sm:text-sm px-2 text-xs pb-0 sm-py-2">Proudly Built by |
        <Link to="https://irbaye.com" >
          <Button className="px-1 sm:text-sm  text-xs" variant={"link"}>
            Dida Irbaye
          </Button>
        </Link>
      </footer>
    </div >
  )
}
