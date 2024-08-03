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
      <footer className="text-right text-sm p-4 py-2">Proudly Built by |
        <Link to="https://irbaye.com" >
          <Button className="px-1" variant={"link"}>
            Dida Irbaye
          </Button>
        </Link>
      </footer>
    </div >
  )
}
