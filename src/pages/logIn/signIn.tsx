import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignIn = () => {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-[24px]">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input type="password" id="name" name="" placeholder="" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-[20px]">
          <Button className="cursor-pointer w-full">Sign in</Button>
          <Button className="cursor-pointer w-full" variant={'outline'}>Sign up</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
