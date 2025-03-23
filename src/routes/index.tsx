import MainLayout from "@/layout"
import Dawboard from "@/pages/dawboard"
import { useRoutes } from "react-router-dom"
import Toshbosmalar from "@/pages/section/toshbosmalar"
import Qolyozmalar from "@/pages/section/qolyozmalar"
import YangiNashriyot from "@/pages/section/yangiNashriyot"
import QadimiyKitobla from "@/pages/section/qadimiyKitobla"
import KitoblarCrt from "@/pages/create/kitoblarCrt"
import Detail from "@/pages/detail"

const Routers = () => {
  return (
    <div>
        {useRoutes([
            {
                path : '/',
                element : <MainLayout/>,
                children : [
                    {
                        path : '/',
                        element : <Dawboard/>,
                        children : [
                            {
                                path : '/toshbosmalar',
                                element : <Toshbosmalar/>
                            },
                            {
                                path : '/qolyozmalar',
                                element : <Qolyozmalar/>
                            },
                            {
                                path : '/yangi-nashriyot',
                                element : <YangiNashriyot/>
                            },
                            {
                                path : '/qadimgi-kitoblar',
                                element : <QadimiyKitobla/>
                            },
                        ]
                    },
                    {
                        path: '/kitoblar-create',
                        element: <KitoblarCrt/>
                    },
                    {
                        path: '/:id',
                        element: <Detail/>
                    }
                ]
            }
        ])}
    </div>
  )
}

export default Routers