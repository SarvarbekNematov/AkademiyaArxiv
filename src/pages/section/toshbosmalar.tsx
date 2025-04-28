import { request } from "@/api";
import  {Button}  from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { JSX } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";

const Toshbosmalar = () => {
      const queryClient = useQueryClient()
      const {id} = useParams()
  
  const {data} = useQuery({
    queryKey: ['categories'],
    queryFn: () => request.get
    ('books').then(res => res.data)
  })  
  const dataAll = Array.isArray(data) ? data : []
  const { data: dataCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => request.get("categories").then((res) => res.data),
  });
  const Category = Array.isArray(dataCategory) ? dataCategory : []
  const Categorydata = Category?.filter((i : any) => i.id === id)
  
  
  
  const filteredData  = dataAll?.filter((item : any) => item.category === Categorydata[0]?.name);
  
     const deleteData = async (deletId: string): Promise<void> => {
        await request.delete(`kitoblar/${deletId}`);
      };
    
      const mutationDelete = useMutation({
        mutationFn: deleteData,
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey:['toshbosmalar']});
        }
      });

  return (
    <div>
      {
        filteredData && filteredData.length > 0 ? <div className="grid grid-cols-4 gap-[24px] mt-[24px]">
                {filteredData?.map((i : any) : JSX.Element => (
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
                  <div className="flex justify-end px-[24px] pb-[10px] pt-[5px]">
                    <Button className="bg-white">
                      <Link className="text-black" to={`/edit/${i.id}`}>
                        <AiFillEdit />
                      </Link>
                    </Button>
                    <Button
                      className="bg-white text-red-500 text-[10px]"
                      variant={"outline"}
                      onClick={() => mutationDelete.mutate(i.id)}
                    >
                      <AiFillDelete />
                    </Button>
                  </div>
                </div>
                ))}
              </div> : <div className="flex justify-center items-center"><h3 className="mt-[50px]">No items</h3></div>
      }
    </div>
  )
}

export default Toshbosmalar