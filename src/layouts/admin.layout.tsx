import { Outlet } from "react-router-dom"
import { Navbar } from "./components/navbar"

export const AdminLayout = () => {
  return (
    <div >
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}
