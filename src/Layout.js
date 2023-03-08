import { Outlet } from "react-router-dom"
import Header from "./Header"


export const Layout = () =>  {
    return (
        <main className="bg-[#141414fa] text-white">
            <Header />
            <Outlet />
        </main>
    )
}

export default Layout