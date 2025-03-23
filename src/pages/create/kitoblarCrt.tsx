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

const KitoblarCrt = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient()
  const navigation = useNavigate()
  const [formValues , setFormValues] = useState({
    name : '',
    desc : '',
    author : '',
    inventarRaqam : null,
    soni : null,
    nashrYili : null,
    nashriyot : '',
    stilaj : '',
    language: '',
    shahar: '',
  })

  /// IMG and FILE

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!file) {
      alert("Iltimos, PDF fayl yuklang!");
      return;
    }
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    

  };

  const [imageUrl, setImageUrl] = useState("");

  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files && e.target.files.length > 0) {
      formData.append("file", e.target.files[0]);
    }
  
    try {
      const response = await request.post("books/upload", formData, {
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
    const response = await request.post(`/books`, newItem);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: postItem,
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['kitob']})
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectCategory = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      category: value, // Select uchun alohida handler ishlatamiz
    }));
  };
  const handleSelectLanguage = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      language: value, // Select uchun alohida handler ishlatamiz
    }));
  };

  console.log(formValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      ...formValues,
      url : imageUrl,
    }
    console.log(newItem);
    
    mutation.mutate(newItem); 
    navigation('/')
    
  };
  

  return (
    <div className="bg-white rounded-[8px] p-[24px] my-[24px]">
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
              name="name"
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
              name="author"
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
                  <SelectItem value="toshbosmalar">Toshbosmalar</SelectItem>
                  <SelectItem value="qo'lyozmalar">Qo'lyozmalar</SelectItem>
                  <SelectItem value="yangiNashriyot">
                    Yangi nashriyot
                  </SelectItem>
                  <SelectItem value="qadimiyKitoblar">
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
              name="language"
              id="language"
              className="border-[1px] w-full h-[40px] border-[#00000040] rounded-[8px] pl-[12px]"
              placeholder="Kitob qaysi tilda yozilganligini kiriting"
            />
          </div>
          <div>
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
          </div>
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
              name="nashrYili"
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
              name="soha"
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
            <Textarea id="izoh" name="desc" onChange={handleInputChange} placeholder="Izoh kiriting" />
          </div>
          <div>
            <Label className="mb-1 block text-[18px] font-medium text-gray-700">Pdf fayl kiriting (ixtiyoriy)</Label>
            <div className="p-4 border rounded-lg shadow-lg">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
            />

          </div>
          </div>
          
          <div>
          <Label className="mb-1 block text-[18px] font-medium text-gray-700">Rasm kiriting (ixtiyoriy)</Label>
            <div className="p-4 border rounded-lg shadow-lg">
            <input placeholder="Rasm kiriting" type="file" accept="image/*" onChange={handleImgUpload} />
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

export default KitoblarCrt;
