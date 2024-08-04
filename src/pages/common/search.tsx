import InfiniteScroll from "@/components/custom/infinite.scroll";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/data.context";
import { useSearch } from "@/context/search.context";
import { Resources } from "@/types/forms.types";
import _ from "lodash";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import Resource from "../components/resource";


export interface apiResponse {
    resources: Resources[],
    currentPage: number,
    totalResults: number,
    totalPages: number
}

export const SearchResults = () => {
    const { isGrid } = useData();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const [apiResponse, setApiResponse] = useState<apiResponse | null>(null);

    const { query, tags, types, topics } = Object.fromEntries(searchParams.entries());
    const { filteredResources, setFilteredResources, search_db } = useSearch();

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const tagsArray = tags ? tags.split(',') : [];
    const typesArray = types ? types.split(',') : [];
    const topicsArray = topics ? topics.split(',') : [];

    const next = async () => {
        setLoading(true);
        setTimeout(async () => {
            try {
                const res: any = await search_db(query, tagsArray, typesArray, topicsArray, 1, 10);
                const resources = res.resources.length ? [...filteredResources || [], ...res.resources] : filteredResources || [];
                const uniqueUpdate = _.uniqBy(resources, '_id');

                setApiResponse(res as apiResponse);
                setFilteredResources(uniqueUpdate);
                setPage((prev: number) => prev + 1);

                if (page == res.totalPages || res.totalPages < page) {
                    setHasMore(false);
                }
            } catch (error: any) {
                setHasMore(false);
                const message = error.response.data.error || "Internal Server Error"
                toast.error(message)
            } finally {
                setLoading(false);
            }
        }, 800);
    };

    useEffect(() => {
        setPage(1);
        next();
    }, [query, tags, types, topics]);
    return (
        <div className="px-4">
            <div className="flex justify-between pb-3 items-center">
                <Link to={"/home"}>
                    <Button variant={"ghost"} className="mt-1 cursor-pointer gap-1 px-2">
                        <ArrowLeft className="icon" /> Back
                    </Button>
                </Link>
                {apiResponse &&
                    <div className="text-sm flex flex-row gap-1 text-gray-500">
                        <p>{apiResponse.totalResults} matches found | </p>
                        <p>Showing {apiResponse.currentPage} of {apiResponse.totalPages} pages</p>
                    </div>
                }
            </div>
            {isGrid ?
                <div className="flex gap-3 flex-wrap w-full">
                    {(filteredResources && filteredResources.length > 0) &&
                        filteredResources.map((resource: Resources, index: number) => (
                            <div key={index} className="sm:w-72 w-full">
                                <Resource item={resource} />
                            </div>
                        ))
                    }
                </div>
                :
                <div className="md:px-10 px-0 md:text-base text-sm">
                    {(filteredResources && filteredResources.length > 0) &&
                        filteredResources.map((item: Resources, index: number) => (
                            <div key={index} >
                                <Link to={`/resource/${item.title.toLowerCase()}`} className="font-semibold hover:underline hover:text-blue-600 px-0">
                                    {item.title}
                                </Link>
                                <span> {" "}
                                    {item.description}
                                </span>
                            </div>
                        ))
                    }
                </div>
            }

            {filteredResources && filteredResources.length === 0 &&
                <div> No resources found </div>
            }

            <InfiniteScroll hasMore={hasMore} isLoading={loading} next={next} threshold={1}>
                {hasMore && <Loader2 className="my-4 mx-2 h-8 w-8 animate-spin" />}
            </InfiniteScroll>
        </div>
    );
};
