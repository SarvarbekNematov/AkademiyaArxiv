import { request } from "@/api";
import { CorrectIcon, LeftIcon } from "@/assets/icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditKitoblar = () => {
  const queryClient = useQueryClient()
  const navigation = useNavigate()
  const [formValues , setFormValues] = useState({
    nomi : '',
    izoh : '',
    muallif : '',
    soni : 0,
    nashr_etilgan_yili : '',
    nashriyot : '',
    stilaj : '',
    kitob_tili: '',
    shahar: '',
    sohasi: ''
  })
  const [fileUrl , setFileUrl] = useState('')

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      alert("Iltimos, PDF fayl yuklang!");
      return;
    }


    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await request.post("kitoblar/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.url) {
        setFileUrl(response.data.url);
      } else {
        throw new Error("API URL qaytarmadi");
      }
    } catch (error) {
      console.error("PDF yuklashda xatolik:", error);
    }
  };
  
  const [imageUrl, setImageUrl] = useState("");

  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files && e.target.files.length > 0) {
      formData.append("file", e.target.files[0]);
    }
    try {
      const response = await request.post("kitoblar/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.data?.url) {
        setImageUrl(response.data.url);
      } else {
        throw new Error("URL qaytmadi");
      }
    } catch (error) {
      console.error("Rasm yuklashda xatolik:", error);
    }
  };

  /// 

  const postItem = async (newItem: any) => {
    const response = await request.post(`kitoblar`, newItem, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postItem,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['umumiyKitob']})
    }
  });

    
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === "soni" ? Number(value) || 0 : value, // 🔥 Agar "soni" bo‘lsa, `number` formatiga o‘giramiz
    }));
  };

  const handleSelectCategory = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      kategoriya: value, // Select uchun alohida handler ishlatamiz
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      ...formValues,
      rasm : imageUrl,
      kitob_file : fileUrl
    }
    console.log(newItem);
    
    mutation.mutate(newItem); 
    navigation('/')
    
  };
  

  return (
    <div className="bg-white rounded-[8px] p-[24px] ">
      <h3>Kitob yaratish</h3>
      <form onSubmit={handleSubmit} className="space-y-[16px]">
        <div className="grid grid-cols-2 gap-[24px]">
          <div className="space-y-[4px]">
            <Label
              className="text-[18px] font-medium text-gray-700"
              htmlFor="nomi"
            >
              Nomi
            </Label>
            <Input
              onChange={handleInputChange}
              name="nomi"
              id="nomi"
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              placeholder="Kitob nomini kiriting"
            />
          </div>
          <div className="space-y-[4px]">
            <Label
              className="text-[18px] font-medium text-gray-700"
              htmlFor="muallif"
            >
              Muallif
            </Label>
            <Input
              onChange={handleInputChange}
              name="muallif"
              id="muallif"
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              placeholder="Muallif nomini kiriting"
            />
          </div>
          <div className="space-y-[4px]">
            <Label
              className="text-[18px] font-medium text-gray-700"
              htmlFor="stilaj"
            >
              Stilaj
            </Label>
            <Input
              onChange={handleInputChange}
              name="stilaj"
              id="stilaj"
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              placeholder="Stilaj raqamini kiriting"
            />
          </div>
          <div className="space-y-[4px]">
            <Label
              className="text-[18px] font-medium text-gray-700"
              htmlFor="inventRaqam"
            >
              Inventar raqami
            </Label>
            <Input
              onChange={handleInputChange}
              name="inventar_raqam"
              id="inventRaqam"
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              placeholder="Muallif nomini kiriting"
              type="number"
            />
          </div>
          <div>
            <Label
              htmlFor="category-select"
              className="mb-1 block text-[18px] font-medium text-gray-700"
            >
              Kategoriya
            </Label>
            <Select onValueChange={handleSelectCategory}>
              <SelectTrigger id="category-select" className="w-full">
                <SelectValue placeholder="Kategoriyasini tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Toshbosmalar">Toshbosmalar</SelectItem>
                  <SelectItem value="Qo'lyozmalar">Qo'lyozmalar</SelectItem>
                  <SelectItem value="Yangi nashriyot">
                    Yangi nashriyot
                  </SelectItem>
                  <SelectItem value="Qadimiy kitoblar">
                    Qadimiy kitoblar
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-[4px]">
            <Label
              className="text-[18px] font-medium text-gray-700"
              htmlFor="language"
            >
              Tili
            </Label>
            <Input
              onChange={handleInputChange}
              name="kitob_tili"
              id="language"
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              placeholder="Kitob qaysi tilda yozilganligini kiriting"
            />
          </div>
          {/* <div>
            <Label
              className="mb-1 block text-[18px] font-medium text-gray-700"
              htmlFor="inventarRaqam"
            >
              Inventar raqami
            </Label>
            <Input
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              placeholder="Inventar raqamini kiriting"
              id="inventarRaqam"
              name="inventarRaqam"
              type="number"
              onChange={handleInputChange}
            />
          </div> */}
          <div>
            <Label
              className="mb-1 block text-[18px] font-medium text-gray-700"
              htmlFor="soni"
            >
              Soni
            </Label>
            <Input
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              placeholder="Kitob sonini kiriting"
              type="number"
              id="soni"
              name="soni"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label
              className="mb-1 block text-[18px] font-medium text-gray-700"
              htmlFor="nashrYili"
            >
              Nashr etilgan yili
            </Label>
            <Input
              id="nashrYili"
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              placeholder="Nashr etilgan yilini kiriting"
              type="number"
              name="nashr_etilgan_yili"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label
              className="mb-1 block text-[18px] font-medium text-gray-700"
              htmlFor="shahar"
            >
              Shahar
            </Label>
            <Input
              placeholder="Shahar nomini kiriting"
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              id="shahar"
              name="shahar"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label
              className="mb-1 block text-[18px] font-medium text-gray-700"
              htmlFor="soha"
            >
              Sohasi
            </Label>
            <Input
              placeholder="Sohasi nomini kiriting"
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              id="soha"
              name="sohasi"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label
              className="mb-1 block text-[18px] font-medium text-gray-700"
              htmlFor="nashriyot"
            >
              Nashriyot
            </Label>
            <Input
              placeholder="Nashriyot nomini kiriting"
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              id="nashriyot"
              name="nashriyot"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label
              className="mb-1 block text-[18px] font-medium text-gray-700"
              htmlFor="izoh"
            >
              Izoh
            </Label>
            <Textarea id="izoh" name="izoh" onChange={handleInputChange} placeholder="Izoh kiriting" />
          </div>
          <div>
            <Label className="mb-1 block text-[18px] font-medium text-gray-700">Pdf fayl kiriting (ixtiyoriy)</Label>
            <div className="p-4 border rounded-lg shadow-lg">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
            />
            {fileUrl && (
              <p>
                Yuklangan PDF:{" "}
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                  Bu yerda ko'rish
                </a>
              </p>
            )}
          </div>
          </div>
          
          <div>
          <Label className="mb-1 block text-[18px] font-medium text-gray-700">Rasm kiriting (ixtiyoriy)</Label>
            <div className="p-4 border rounded-lg shadow-lg">
            <input placeholder="Rasm kiriting" type="file" accept="image/*" onChange={handleImgUpload} />
            {imageUrl && (
              <p>
                Yuklangan PDF:{" "}
                <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                  Bu yerda ko'rish
                </a>
              </p>
            )}
          </div>
          </div>
          
        </div>
        <div className="flex justify-end gap-[16px]">
                <button className="border-1 border-[#D9D9D9] rounded-[6px] px-[16px]"><LeftIcon/></button>
                <button type="submit" className="bg-[#32A934] px-[16px] rounded-[6px]" ><CorrectIcon/></button>
            </div>
      </form>
    </div>
  );
};

export default EditKitoblar;
