import { request } from "@/api"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const Detail = () => {
    const {id} = useParams()

    const {data} = useQuery<any>({
        queryKey: ['kitobId' , id],
        queryFn: () => request.get
        (`kitoblar/${id}`).then(res => res.data)
      })  
  const dataAll = (data?.data) ? data.data : [];

  console.log(dataAll);
    
  return (
    <div>
        <div className="p-[24px]">
        <div className="flex gap-4">
            <div className="bg-white w-[30%] rounded-2xl p-[24px]">
                <img className="h-[300px] w-full" src={dataAll?.rasm} alt={dataAll?.nomi} />
            </div>
            <div className="bg-white w-[70%] rounded-2xl p-[24px]">
                <div className="flex justify-between">
                    <h3 className="text-[#269328] text-3xl font-semibold mb-[10px]">{dataAll?.nomi}</h3>
                    <h2 className="text-[16px]">{dataAll?.kategoriya}</h2>
                </div>
                <p className="text-[14px] leading-[22px] text-[#000000A6]">{dataAll?.izoh}</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Detail