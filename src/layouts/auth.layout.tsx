import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthLayout = () => {
    const navigate = useNavigate(); 
    return (
        <div className={`w-screen h-screen flex justify-center items-center p-6 md:p-3`}>
            <Button aria-label='back' variant={"ghost"} onClick={() => navigate("/")} className="mt-1 cursor-pointer absolute top-4 left-6"> <ArrowLeftIcon /></Button>
            <Outlet />
        </div>
    );
}