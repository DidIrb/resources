import { Outlet } from "react-router-dom"
import { Navbar } from "./components/navbar"

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <Navbar />
      <div className="px-2 flex-1">
        <Outlet />
      </div>
      <footer className="text-right text-sm p-4">Copyright © {new Date().getFullYear()} | Dida Irbaye</footer>
    </div>
  )
}
