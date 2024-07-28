import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useApp } from "@/context/app.context";
import { useAuth } from "@/context/auth.context";
import { useSearch } from "@/context/search.context";
import { Resources } from "@/types/forms.types";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { ChevronLeft } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ResourcesForm from "../forms/resource.form";

export function Slug() {
    const { openEditResource, open } = useApp();
    const { slug } = useParams();
    const { search } = useSearch();
    const { session } = useAuth();
    const stored = localStorage.getItem('resources') as string;
    const parsed = JSON.parse(stored) || [];
    let data: Resources = parsed.find((item: Resources) => item.title.toLowerCase() === slug);

    useEffect(() => {
        if (!data) { fetchData(); }
    }, [])

    const fetchData = async () => {
        const response = await search(`${slug}`, [], [], ["title"], "asc", 1, 1);
        return response;
    };

    return (
        <div className="px-4">

            <Link to={`${session ? "/dashboard" : "/home"}`} className="flex items-center gap-2 cursor-pointer">
                <ChevronLeft /> Back
            </Link>
            {!data ?
                <div className="text-center pt-5">
                    <h3 className="text-6xl font-bold tracking-tight">
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
                            <h1 className=" font-semibold">{data.title}</h1>
                            <div className="flex gap-2 items-center">
                                {session && (
                                    <Pencil1Icon
                                        className="icon-sm cursor-pointer"
                                        onClick={() => openEditResource(data)}
                                    />
                                )}
                            </div>
                        </div>
                        <hr className="mb-2 mt-1" />
                        <div className="content flex w-full py-2 gap-3">
                            {data.icon &&
                                <img src={data.icon} className="h-36 w-36 float" alt={`${data.title} icon`} />
                            }
                            <p className="img-text text-gray-600 text-sm ">{data.description}</p>
                        </div>
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
                        <div className="text-xs text-muted-foreground flex items-center">
                            <div className="w-24"> Published :</div>  {moment(data?.createdAt).format("MMMM Do YYYY")} </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                            <div className="w-24">Last Modified :</div> {moment(data?.updatedAt).format("MMMM Do YYYY")} </div>

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
