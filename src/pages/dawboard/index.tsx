import { request } from "@/api";
import { FilterIcon, PlusIcon, SearchIcon } from "@/assets/icon";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { JSX } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AiFillEdit , AiFillDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";


const Dawboard = () => {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["umumiyKitob"],
    queryFn: () => request.get("kitoblar").then((res) => res.data),
  });
  const dataAll = Array.isArray(data?.data) ? data.data : [];

  const { data: dataCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => request.get("kategoriya").then((res) => res.data),
  });
  const CategoryData = Array.isArray(dataCategory?.data)
    ? dataCategory.data
    : [];

  const handleClickbtn = () => {
    navigation("/kitoblar-create");
  };

  const deleteData = async (deletId: number): Promise<void> => {
    await request.delete(`kitoblar/${deletId}`);
  };

  const mutationDelete = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["umumiyKitob"] });
    },
  });

  return (
    <div className="pb-[50px]">
      <div className="bg-white rounded-[8px] pt-[10px] px-[24px]">
        <div className="flex items-center justify-between ">
          <h2 className="text-[22px] text-[#000000b9]">Kitoblar</h2>
          <div className="flex items-center gap-[16px]">
            <div className="relative w-full">
              <Input
                className="pr-10 text-gray-500 border-gray-300 focus:ring-0 focus:border-gray-400"
                placeholder="Qidirish..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
            </div>
            <Button variant={"outline"}>
              <FilterIcon />
            </Button>
            <Button
              onClick={handleClickbtn}
              className="bg-[#32A934] text-white"
            >
              <PlusIcon /> Qo'shish
            </Button>
          </div>
        </div>
        <div className="container flex pt-[10px] ">
          <NavLink
            className={({ isActive }) =>
              `!bg-white h-[45px] block xl:p-[12px] ${
                isActive ? "text-[#32A934] border-b-3 border-b-[#32A934]" : ""
              }`
            }
            to="/"
          >
            Barchasi
          </NavLink>
          {CategoryData?.map((i: any) => (
            <NavLink
              key={i.id}
              className={({ isActive }) =>
                `!bg-white h-[45px] block xl:p-[12px]  ${
                  isActive ? "text-[#32A934] border-b-3 border-b-[#32A934]" : ""
                }`
              }
              to={`/category/${i.id}`}
            >
              {i.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        {location.pathname == "/" ? (
          <div className="grid grid-cols-4 gap-[24px] mt-[24px]">
            {dataAll?.map(
              (i: any): JSX.Element => (
                <div key={i.id} className="bg-white rounded-[10px] pt-[10px]">
                  <Link to={`/${i.inventar_raqam}`}>
                    <div className="w-[80%] mx-auto pb-[10px]">
                      <img
                        className="h-[250px] border w-full mx-auto "
                        src={i.rasm}
                        alt={i.nomi}
                      />
                    </div>
                    <div className="border-t-[0.5px] pt-[16px] px-[24px] border-[#00000013]">
                      <div>
                        <h4 className="text-[#269328] font-semibold">
                          {i.nomi}
                        </h4>
                        <span></span>
                      </div>
                      <p className="text-[12px] leading-[20px] text-[#000000A6]">
                        {i.izoh}
                      </p>
                    </div>
                  </Link>
                  <div className="flex justify-end gap-[16px] px-[24px] pb-[10px] pt-[5px]">
                    <Button className="bg-white " variant={"outline"}>
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
              )
            )}
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Dawboard;
