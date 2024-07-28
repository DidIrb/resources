import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useData } from "@/context/data.context";
import { useSearch } from "@/context/search.context";
import { debounce, filterByValue } from "@/lib/func";
import { LayoutGrid, List, Search } from "lucide-react";
import { ChangeEvent, useCallback } from "react";
import { toast } from "sonner";
import { Filter } from "./filter";

export const SearchBar = () => {
  const { resources, setFilteredResources, search, setQuery, selectedFields, selectedTypes, selectedTags } = useSearch();
  const { isGrid, setIsGrid } = useData();
  const appConfig = JSON.parse(localStorage.getItem('config') || 'null');

  const handleToggle = () => {
    setIsGrid(!isGrid);
    localStorage.setItem("config", JSON.stringify({...appConfig, isGrid: !isGrid}));
  };

  const handleSearch = useCallback(
    debounce(async (query: string) => {
      const filteredData = filterByValue(resources, query);
      if (filteredData.length === 0) {
        try {
          await search(query, selectedTags, selectedTypes, selectedFields, "asc", 1, 2);
        } catch (error: any) {
          const message = error.response.data.error || "Internal Server Error"
          toast.error(message);
        }
        console.log(query);
      } else {
        setFilteredResources(filteredData);
      }
    }, 1000),
    [resources, selectedTags, selectedTypes, selectedFields]
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
    setQuery(event.target.value);
  };

  return (
    <div className="ml-auto flex gap-2 flex-1 sm:flex-initial">
      <div className="flex gap-1 justify-end">
        <Button variant="outline" className="w-8 rounded-full" size="icon" onClick={handleToggle}>
          {isGrid ? <LayoutGrid className="icon" /> : <List />}
        </Button>
        <Filter />
      </div>
      <div className="relative w-full flex items-center">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search Resources..."
          className="pl-8 sm:w-full md:w-[300px] h-8 rounded-full lg:w-[400px]"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
