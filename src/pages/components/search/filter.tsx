import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useData } from "@/context/data.context";
import { useSearch } from "@/context/search.context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Filter() {
  const { types, tags, topics, fetchData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const { handleTypes, handleTags, handleTopics, selectedTopics, selectedTypes, selectedTags, search } = useSearch();

  const Reload = async () => {
    setIsLoading(true);
    try {
      await fetchData();
      toast.success("Data fetched successfully");
    } catch (error) {
      toast.error("An error occurred while fetching data");
    } finally {
      setTimeout(() => { setIsLoading(false) }, 1000);
    }
  }

  const filterDataMethod = async () => {
    const res: any = await search("", selectedTags, selectedTypes, selectedTopics, 1, 10);
    console.log(res);
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild >
        <Button variant="outline" size="icon" className="w-8 rounded-full" >
          <SlidersHorizontal className="icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2 sm:w-full w-64 mr-4 overflow-auto" align="start" >
      <DropdownMenuLabel className="font-semibold text-lg pb-0"> Parameters
      </DropdownMenuLabel>
        <DropdownMenuLabel className="font-medium"> Filter types
        </DropdownMenuLabel>
        <div className="flex gap-2 px-1 flex-wrap">
          {
            types.map((type, index: number) => (
              <Button key={index}
                variant={selectedTypes.includes(type) ? "default" : "secondary"}
                className={`h-6 px-2 rounded-full `}
                onClick={() => handleTypes(type)}
              >
                {type}
              </Button>
            ))
          }
        </div>
        <DropdownMenuLabel className="font-medium">Filter tags</DropdownMenuLabel>
        <div className="flex gap-2 px-1 flex-wrap">
          {
            tags.map((tag, index: number) => (
              <Button key={index}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                className={`h-6 px-2 rounded-full `}
                onClick={() => handleTags(tag)}
              >
                {tag}
              </Button>
            ))
          }
        </div>
        <DropdownMenuLabel className="font-medium">Filter topics</DropdownMenuLabel>
        <div className="flex gap-2 px-1 flex-wrap">
          {
            topics.map((item, index: number) => (
              <Button key={index}
                variant={selectedTopics.includes(item) ? "default" : "secondary"}
                className={`h-6 px-2 rounded-full `}
                onClick={() => handleTopics(item)}
              >
                {item}
              </Button>
            ))
          }
        </div>
        <hr className="mt-3"/>
        <DropdownMenuLabel className="font-medium text-lg flex gap-2 justify-end items-center mt-1">
          <Button variant="outline" className="h-6 px-3" onClick={Reload} >
            {isLoading ?
              <ReloadIcon className={`icon ${isLoading && 'animate-spin'} h-3 cursor-pointer`} />
              : "Reload Params"}
          </Button>
          <Button variant="outline" className="h-6 bg-blue-600 px-3 text-white" onClick={filterDataMethod} >
            filter
          </Button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}