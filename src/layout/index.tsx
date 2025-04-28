import Header from "@/components/header"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div>
        <div>
            <Header/>
        </div>
        <div className="bg-[#F0F0F0] py-[30px] px-[30px]">
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout