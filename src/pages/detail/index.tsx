import { request } from "@/api"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const Detail = () => {
    const {id} = useParams()

    const {data} = useQuery<any>({
        queryKey: ['kitobId' , id],
        queryFn: () => request.get
        (`books/${id}`).then(res => res.data)
      })  

  return (
    <div>
        <div className="p-[24px]">
        <div className="flex gap-4">
            <div className="bg-white w-[30%] rounded-2xl p-[24px]">
                <img className="h-[300px] w-full" src={data?.url} alt={data?.name} />
            </div>
            <div className="bg-white w-[70%] rounded-2xl p-[24px]">
                <div className="flex justify-between">
                    <h3 className="text-[#269328] text-3xl font-semibold mb-[10px]">{data?.name}</h3>
                    <h2 className="text-[16px]">{data?.category}</h2>
                </div>
                <p className="text-[14px] leading-[22px] text-[#000000A6]">{data?.desc}</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Detail