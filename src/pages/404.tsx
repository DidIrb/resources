import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth.context";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";


export default function PageNotFound() {
    const navigate = useNavigate();
    const { session } = useAuth();

    return (
        <div className="w-screen h-screen flex justify-center items-center ">
            <Helmet>
                <title> Resource | 404 </title>
                <meta name="description" content="Page not found!" />
            </Helmet>
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="md:text-6xl text-4xl font-bold tracking-tight">
                    404
                </h3>
                <p className="text-sm text-muted-foreground">
                    Sorry, the page you're looking for doesn't exist.
                </p>
                <div className="flex">
                    <Link to={`${session ? "/dashboard" : "/home"}`}>
                        <Button variant={"ghost"} className="mt-1 cursor-pointer gap-1 px-2">
                            <ArrowLeft className="icon" />  Back to Home
                        </Button>
                    </Link>
                    <Button variant={"link"} onClick={() => navigate(-1)} className="mt-1 cursor-pointer">Previous Page</Button>
                </div>
            </div>
        </div>
    )
}