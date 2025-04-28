import { request } from "@/api";
import { PlusIcon } from "@/assets/icon";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const CategoryCrt = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => request.get("kategoriya").then((res) => res.data),
  });
  const dataAll = Array.isArray(data?.data) ? data.data : [];

  const deleteData = async (deletId: number): Promise<void> => {
    await request.delete(`kategoriya/${deletId}`);
  };

  const mutationDelete = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  const handleDelete = (id: number) => {
    mutationDelete.mutate(id);
    setOpen(false);
  };
  return (
    <div>
      <div className="w-[50%] bg-white p-[14px] mx-auto rounded-[4px]">
        <Table className="w-full table-fixed ">
          <TableHeader>
            <TableRow className="">
              <TableHead className="text-left">Umumiy kategoriyalar</TableHead>
              <TableHead className="text-right">
                <Button>
                  <PlusIcon /> Qo'shish
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {dataAll.map((i: any, index: number) => (
              <TableRow className="pt-[10px]" key={i.id}>
                <TableCell>
                  {index + 1}. {i.nomi}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <Button variant="outline" onClick={() => setEditOpen(true)}>
                      <AiFillEdit />
                    </Button>
                    <DialogContent className="sm:max-w-[225px]">
                      <DialogTitle>Kategoriya tahrirlash</DialogTitle>{" "}
                      {/* 🔹 Qo‘shildi */}
                      <DialogDescription>
                        Kategoriyaning yangi nomini kiriting
                      </DialogDescription>{" "}
                      {/* 🔹 Qo‘shildi */}
                      <div className="flex justify-center gap-4">
                        <form>
                          <Label>Kategoriya nomi</Label>
                          <Input placeholder="nomini kiriting" />
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setOpen(true)}>
                        <AiFillDelete />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[225px]">
                      <div className="flex justify-center gap-4">
                        <div className="">
                          <Button
                            className="bg-red-600"
                            onClick={() => handleDelete(i.id)}
                          >
                            Yes
                          </Button>
                        </div>
                        <div className="">
                          <Button
                            className="bg-green-600"
                            onClick={() => setOpen(false)}
                          >
                            No
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryCrt;
