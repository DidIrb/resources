import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth.context";
import { Link, useNavigate } from "react-router-dom";


export default function PageNotFound() {
    const navigate = useNavigate();
    const { session } = useAuth();

    return (
        <div className="w-screen h-screen flex justify-center items-center ">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-6xl font-bold tracking-tight">
                    404
                </h3>
                <p className="text-sm text-muted-foreground">
                    Sorry, the page you're looking for doesn't exist.
                </p>

                <Button variant={"ghost"} onClick={() => navigate(-1)} className="mt-1 cursor-pointer">
                    <Link to={`${session ? "/dashboard" : "/home"}`}>Home</Link>
                </Button>
                <Button variant={"ghost"} onClick={() => navigate(-1)} className="mt-1 cursor-pointer">Previous Page</Button>
            </div>
        </div>
    )
}