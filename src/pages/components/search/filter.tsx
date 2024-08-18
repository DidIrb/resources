import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useData } from "@/context/data.context";
import { useSearch } from "@/context/search.context";
import { filterData } from "@/lib/filter-func";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function Filter() {
  const { types, tags, topics, fetchData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const { handleTypes, handleTags, handleTopics, selectedTopics, query, selectedTypes, selectedTags } = useSearch();
  const navigate = useNavigate();

  const Reload = async () => {
    setIsLoading(true);
    try {
      await fetchData();
      toast.success("Parameters fetched successfully");
    } catch (error) {
      toast.error("An error occurred while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = () => {
    const searchParams = filterData(query, selectedTags, selectedTypes, selectedTopics);
    navigate("/search?" + searchParams, { replace: true });
  };

  useEffect(() => {
    fetchData();
  }, [location.search]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-8 rounded-full">
          <SlidersHorizontal className="icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2 sm:w-full w-72 max-w-[500px] mr-4 overflow-auto" align="start">
        <DropdownMenuLabel className="flex justify-between items-center pb-0">
          <p className="font-semibold text-xl">Parameters</p>
          <div className="font-semibold flex gap-2 justify-end items-center mt-1">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={Reload}>
              <ReloadIcon className={`icon ${isLoading && 'animate-spin'} h-3 cursor-pointer`} />
            </Button>
            <Button className="h-7"  onClick={handleFilter}>
              Filter
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="text-base font-semibold">Filter types</DropdownMenuLabel>
        <div className="flex gap-2 max-h-24 overflow-auto px-1 flex-wrap">
          {types.map((type, index: number) => (
            <Button
              key={index}
              variant={selectedTypes.includes(type) ? "default" : "secondary"}
              className={`h-6 px-2 rounded-full`}
              onClick={() => handleTypes(type)}
            >
              {type}
            </Button>
          ))}
        </div>
        <DropdownMenuLabel className="text-base font-semibold">Filter tags</DropdownMenuLabel>
        <div className="flex gap-2 max-h-24 overflow-auto px-1 flex-wrap">
          {tags.map((tag, index: number) => (
            <Button
              key={index}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className={`h-6 px-2 rounded-full`}
              onClick={() => handleTags(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        <DropdownMenuLabel className="text-base font-semibold">Filter topics</DropdownMenuLabel>
        <div className="flex gap-2 max-h-24 overflow-auto px-1 flex-wrap">
          {topics.map((item, index: number) => (
            <Button
              key={index}
              variant={selectedTopics.includes(item) ? "default" : "secondary"}
              className={`h-6 px-2 rounded-full`}
              onClick={() => handleTopics(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
