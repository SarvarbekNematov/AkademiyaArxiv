import MainLayout from "@/layout"
import Dawboard from "@/pages/dawboard"
import { useRoutes } from "react-router-dom"
import Toshbosmalar from "@/pages/section/toshbosmalar"
import KitoblarCrt from "@/pages/create/kitoblarCrt"
import Detail from "@/pages/detail"
import EditKitoblar from "@/pages/edit"
import CategoryCrt from "@/pages/create/categoryCrt"

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
                                path : '/category/:id',
                                element : <Toshbosmalar/>
                            }
                        ]
                    },
                    {
                        path: '/sozlamalar',
                        element: <CategoryCrt/>
                    },
                    {
                        path: '/kitoblar-create',
                        element: <KitoblarCrt/>
                    },
                    {
                        path: '/:id',
                        element: <Detail/>
                    },
                    {
                        path: '/edit/:id',
                        element: <EditKitoblar/>
                    }
                ]
            }
        ])}
    </div>
  )
}

export default Routers