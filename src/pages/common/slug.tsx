import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useApp } from "@/context/app.context";
import { useAuth } from "@/context/auth.context";
import { useSearch } from "@/context/search.context";
import { Resources } from "@/types/forms.types";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { ChevronLeft, Share2 } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ResourcesForm } from "../forms/resource.form";

export function Slug() {
    const { openEditResource, open } = useApp();
    const { slug } = useParams();
    const { search_db, isLoading } = useSearch();
    const { session } = useAuth();
    const stored = localStorage.getItem('resources') as string;
    const parsed = JSON.parse(stored) || [];
    let data: Resources = parsed.find((item: Resources) => item.title.toLowerCase() === slug);

    useEffect(() => { if (!data) { fetchData() } }, [])

    const fetchData = async () => {
        const response = await search_db(`${slug}`, [], [], [], 1, 1);
        return response;
    };
    
    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
    }

    return (
        <div className="px-4">
            <Helmet>
                <title> Resource |
                    {isLoading ? "searching" : ""} {!data && !isLoading ? "resource not found" : `${slug}`}
                </title>
            </Helmet>
            <Link to={`${session ? "/dashboard" : "/home"}`} className="flex items-center gap-2 cursor-pointer">
                <ChevronLeft /> Back
            </Link>
            {!data ?
                <div className="text-center pt-5">
                    <h3 className="sm:text-6xl text-4xl font-bold tracking-tight">
                        404
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Sorry, the page you're looking for doesn't exist.
                    </p>
                </div>
                :
                <div className="p-3">
                    <Card className="md:w-[700px] w-full p-2 pt-1">
                        <div className="flex justify-between items-center">
                            <div className='flex items-center py-1  gap-2 w-full cursor-pointer relative'>
                                <Avatar className="w-7 h-7 ">
                                    <AvatarImage src={data.icon} />
                                    <AvatarFallback>{data.title.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <p className="font-semibold hover:underline hover:text-blue-600 px-0">
                                    {data.title}
                                </p>
                                <Share2 onClick={copyLink} className="absolute top-2 right-2" />
                            </div>
                            <div className="flex gap-2 items-center">
                                {session?.role !== "admin" || session?.role !== "super_admin" && (
                                    <Pencil1Icon
                                        className="icon-sm cursor-pointer"
                                        onClick={() => openEditResource(data)}
                                    />
                                )}
                            </div>
                        </div>
                        <hr className="mb-2 mt-1" />
                        <p className="img-text p-2 text-gray-600 text-sm ">{data.description}</p>
                        {/* Render tags */}
                        <hr className="my-2" />
                        <div className="flex flex-wrap gap-1 items-center mt-0">
                            <Badge className="font-medium" variant="secondary">{data.type}</Badge>
                            {data.tags.map((item: string, index: number) => (
                                <Badge variant="outline" key={index} className="font-medium">
                                    {item}
                                </Badge>
                            ))}
                        </div>

                        <hr className="my-2" />
                        <div className="text-xs text-muted-foreground">
                            <div> <span className="inline-block w-24">Published : </span> {moment(data?.createdAt).format("MMMM Do YYYY")} </div>
                            <div> <span className="inline-block w-24">Last Modified :</span> {moment(data?.updatedAt).format("MMMM Do YYYY")} </div>
                        </div>
                        <Link to={data.link} className="text-blue-500 text-sm text-end hover:underline">
                            {data.link}
                        </Link>

                    </Card>

                    <div className="mb-4">
                    </div>
                </div>
            }

            <ResourcesForm open={open} toggleOpenState={openEditResource} />
        </div>
    )
}
