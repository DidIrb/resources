import { Outlet } from "react-router-dom"
import { Navbar } from "./components/navbar"

export const Layout = () => {
  return (
    <div >
      <Navbar />
      <div className="px-2">
        <Outlet />
      </div>
    </div>
  )
}
