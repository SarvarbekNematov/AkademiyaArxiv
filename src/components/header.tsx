import { Link } from "react-router-dom";
import  {Button}  from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center px-[24px] py-[15px]">
        <div>
          <p>LOGO</p>
        </div>
        <div className="flex gap-[16px] items-center">
          <Link to={"/sozlamalar"}>Sozlamalar</Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline"  onClick={() => setOpen(true)}>Log out</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[225px]">
              <div className="flex justify-center gap-4">
                <div className="">
                  <Button className="bg-red-600">Yes</Button>
                </div>
                <div className="">
                  <Button className="bg-green-600" onClick={() => setOpen(false)}>No</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Header;
