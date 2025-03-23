import { request } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { JSX } from "react";
import { Link } from "react-router-dom";

const QadimiyKitobla = () => {
  const {data} = useQuery({
    queryKey: ['qadimiykitob'],
    queryFn: () => request.get
    ('books').then(res => res.data)
  })  
  const dataAll = Array.isArray(data) ? data : []
  

  const filteredData  = dataAll?.filter((item : any) => item.section === "Qadimiy kitoblar");
  
  return (
    <div>
      {
        filteredData && filteredData.length > 0 ? <div className="grid grid-cols-4 gap-[24px] mt-[24px]">
                {filteredData?.map((i : any) : JSX.Element => (
                  <div key={i.id} className="bg-white rounded-[10px] pt-[10px]">
                  <Link to={`/${i.id}`}>
                    <div className="w-[80%] mx-auto pb-[10px]">
                      <img className="h-[200px] border w-full mx-auto " src={i.image_url} alt={i.title} />
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
              </div> : <div className="flex justify-center items-center"><h3 className="mt-[50px]">No items</h3></div>
      }
    </div>
  )
}

export default QadimiyKitobla