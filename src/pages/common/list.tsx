import InfiniteScroll from "@/components/custom/infinite.scroll";
import config from "@/config/config";
import { useApp } from "@/context/app.context";
import { useData } from "@/context/data.context";
import { useSearch } from "@/context/search.context";
import api from "@/lib/api";
import { saveToLocalStorage } from "@/lib/func";
import { Resources } from "@/types/forms.types";
import { AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Resource from "../components/resource";

export interface apiResponse {
    data: Resources[],
    currentPage: number,
    totalItems: number,
    totalPages: number
}
export interface app_Config {
    isGrid: boolean,
    currentPage: number,
    totalItems: number,
    totalPages: number
}

export const ResourceList = () => {
    const appConfig = JSON.parse(localStorage.getItem('config') || 'null');
    const parsedResources = JSON.parse(localStorage.getItem('resources') || '[]');

    const { isGrid } = useData();
    const { openEditResource } = useApp();
    const { filteredResources, resources, setResources, setFilteredResources, query } = useSearch();

    const isLastPage = appConfig?.totalPages === appConfig?.currentPage
    let [page, setPage] = useState(appConfig?.currentPage || 1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState<boolean>(isLastPage || true);
    const pageSize = 2;


    const hasFetched = useRef(false);
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        if (parsedResources.length > 0) {
            setResources(parsedResources);
            setFilteredResources(parsedResources);
        }
    }, []);

    const next = async () => {
        setLoading(true);
        setTimeout(async () => {
            try {
                const response: AxiosResponse<apiResponse> = await api.get<apiResponse>(`${config.url}/resources`,
                    { params: { page, pageSize } }
                );

                console.log(response)
                const { data, currentPage, totalItems, totalPages } = response.data;
                const savedData = saveToLocalStorage(data)
                setFilteredResources(savedData);
                setResources(savedData);
                const scrollFilter = { ...appConfig, currentPage, totalItems, totalPages };
                localStorage.setItem('config', JSON.stringify(scrollFilter));

                setPage((prev: number) => prev + 1);
                if (page == totalPages) {
                    setHasMore(false);
                }
            } catch (error: any) {
                setHasMore(false);
                const message = error.response.data.error || "Internal Server Error"
                toast.error(message)
                console.log(error);
            }

            setLoading(false);
        }, 800);
    };

    return (
        <div >
            {isGrid ?
                <div className="flex gap-3 flex-wrap w-full">
                    {filteredResources.length > 0 &&
                        filteredResources.map((resource: Resources) => (
                            <div key={resource.id} className="sm:w-72 w-full">
                                <Resource item={resource} />
                            </div>
                        ))}
                </div>
                :
                <div >
                    {filteredResources.length > 0 &&
                        filteredResources.map((item: Resources, index: number) => (
                            <div key={index} >
                                <Link to={`/q/${item.title.toLowerCase()}`} className="font-semibold hover:underline hover:text-blue-600 px-0">
                                    {item.title}
                                </Link>
                                <span> {" "}
                                    {item.description}
                                </span>
                            </div>
                        ))}
                </div>
            }
            {!query &&
                <InfiniteScroll hasMore={hasMore} isLoading={loading} next={next} threshold={1}>
                    {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
                </InfiniteScroll>
            }
            {!resources && (
                <div className="text-sm">
                    <span>No resources found</span>
                    <button className="h-8 text-blue-700" onClick={() => openEditResource(null)} >
                        Add Resource
                    </button>
                </div>
            )}

        </div>
    );
};
