import { request } from "@/api"
import { FilterIcon, PlusIcon, SearchIcon } from "@/assets/icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { JSX } from "react"
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"

const Dawboard = () => {
    const navigation = useNavigate()
    const {data} = useQuery({
        queryKey: ['maxsulotlar'],
        queryFn: () => request.get
        ('books').then(res => res.data)
      })  
      console.log(data);
      
    const handleClickbtn = () => {
        navigation('/kitoblar-create')
    }

  return (
    <div className="pt-[30px] pb-[50px]">
        <div className="bg-white rounded-[8px] pt-[10px] px-[24px]">
        <div className="flex items-center justify-between ">
                <h2>Kitoblar</h2>
            <div className="flex items-center gap-[16px]">
                <div className="relative w-full">
                    <Input className="pr-10 text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400" placeholder="Qidirish..." />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <SearchIcon />
                    </div>
                </div>
                <Button variant={"outline"}><FilterIcon/></Button>
                <Button onClick={handleClickbtn} className="bg-[#32A934] text-white"><PlusIcon/> Qo'shish</Button>
            </div>
        </div>
            <div className="container pt-[10px] ">
            <div className="flex items-center gap-[24px]">
              <NavLink to="/" end className={({ isActive }) =>  `!bg-white text-[18px] h-[40px] block   ${isActive ? 'text-[#32A934] border-b-3 border-b-[#32A934]' : ''}` } >
                Barchasi
              </NavLink>
              <NavLink className={({ isActive }) =>  `!bg-white h-[40px] text-[18px] block   ${isActive ? 'text-[#32A934] border-b-3 border-b-[#32A934]' : ''}` } to={'/toshbosmalar'}>Toshbosmalar</NavLink>
              <NavLink className={({ isActive }) =>  `!bg-white h-[40px] text-[18px] block   ${isActive ? 'text-[#32A934] border-b-3 border-b-[#32A934]' : ''}` } to={'/qolyozmalar'}>Qo'lyozmalar</NavLink>
              <NavLink className={({ isActive }) =>  `!bg-white h-[40px] text-[18px] block   ${isActive ? 'text-[#32A934] border-b-3 border-b-[#32A934]' : ''}` } to={'/yangi-nashriyot'}>Yangi nashriyot</NavLink>
              <NavLink className={({ isActive }) =>  `!bg-white h-[40px] text-[18px] block   ${isActive ? 'text-[#32A934] border-b-3 border-b-[#32A934]' : ''}` } to={'/qadimgi-kitoblar'}>Qadimiy kitoblar</NavLink>
            </div>

          </div>
        </div>
        <div>
        {
        location.pathname == '/' ? <div className="grid grid-cols-4 gap-[24px] mt-[24px]">
          {data?.map((i : any) : JSX.Element => (
            <div key={i.id} className="bg-white rounded-[10px] pt-[10px]">
              <Link to={`/${i.id}`}>
                <div className="w-[80%] mx-auto pb-[10px]">
                  <img className="h-[250px] border w-full mx-auto " src={i.image_url} alt={i.title} />
                </div>
                <div className="border-t-[0.5px] pt-[16px] px-[24px] border-[#00000013]">
                    <div>
                        <h4 className="text-[#269328] font-semibold">{i.name}</h4>
                        <span></span>
                    </div>
                  <p className="text-[12px] leading-[20px] text-[#000000A6]">{i.desc}</p>
                </div>
              </Link>
            </div>
            
          ))}
        </div> : <Outlet/>
        }
        </div>
    </div>
  )
}

export default Dawboard