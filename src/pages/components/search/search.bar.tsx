import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useData } from "@/context/data.context";
import { useSearch } from "@/context/search.context";
import { debounce, filterByValue, saveToLocalStorage } from "@/lib/func";
import { LayoutGrid, List, Search } from "lucide-react";
import { ChangeEvent, useCallback, useState } from "react";
import { Filter } from "./filter";
import { toast } from "sonner";

export const SearchBar = () => {
  const {
    resources, setFilteredResources, search_db, query,filteredData, setFilteredData, setQuery,
    selectedTopics, selectedTypes, selectedTags
  } = useSearch();

  const { isGrid, setIsGrid } = useData();


  const appConfig = JSON.parse(localStorage.getItem('config') || 'null');

  const handleToggle = () => {
    setIsGrid(!isGrid);
    localStorage.setItem("config", JSON.stringify({ ...appConfig, isGrid: !isGrid }));
  };

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = useCallback(
    debounce(async (data: string) => {
      let result = filterByValue(resources, data);
      setFilteredData(result)
      if (result.length === 0) {
        setFilteredResources(result);
        try {
          const res: any = await search_db(data, selectedTags, selectedTypes, selectedTopics, 1, 10);
          const savedData = saveToLocalStorage(res.resources)
          setFilteredResources(savedData);
        } catch (error: any) {
          const message = error.response.data.error || "Internal Server Error"
          toast.error(message);
        }
      } else {
        setFilteredResources(result);
      }
    }, 1000),
    [resources, selectedTags, selectedTypes, selectedTopics]
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
    setQuery(event.target.value);
  };

  return (
    <div className="ml-auto flex relative  gap-2 flex-1 sm:flex-initial">
      <div className="flex gap-1 justify-end">
        <Button variant="outline" className="w-8 rounded-full" size="icon" onClick={handleToggle} aria-label="Toggle View">
          {isGrid ? <LayoutGrid className="icon" /> : <List />}
        </Button>
        <Filter />
      </div>
      <div className="relative w-full flex items-center">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search Resources | Filter only for now"
          className="pl-8  h-8 rounded-full sm:w-full md:w-[300px] lg:w-[400px]"
          onChange={onChange}
        />
      </div>

      {(filteredData?.length === 0 && isFocused) &&
        <div className="flex absolute left-0 top-9  justify-end w-full">
          <Card className="sm:w-full lg:w-[400px] rounded-t-none p-3 overflow-auto">
            <div className="text-sm">No results found searching for "{query}"</div>
            {/* Show filtered Data */}
          </Card>
        </div>
      }

      {/* Allow search bar to first show the results */}
    </div>
  );
};
