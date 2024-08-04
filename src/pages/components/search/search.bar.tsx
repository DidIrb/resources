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
import { Link } from "react-router-dom";
import { Resources } from "@/types/forms.types";

export const SearchBar = () => {
  const {
    resources, setFilteredResources, search_db, query, isLoading, filteredData, setResources, setFilteredData, setQuery,
    selectedTopics, selectedTypes, selectedTags
  } = useSearch();

  const [searchResults, setSearchResults] = useState<Resources[] | null>(null)

  const { isGrid, setIsGrid } = useData();

  const appConfig = JSON.parse(localStorage.getItem('config') || 'null');

  const handleToggle = () => {
    setIsGrid(!isGrid);
    localStorage.setItem("config", JSON.stringify({ ...appConfig, isGrid: !isGrid }));
  };

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => { setIsFocused(true); };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = useCallback(
    debounce(async (data: string) => {
      const result = filterByValue(resources, data);
      setFilteredData(result)
      if (result.length === 0) {
        setFilteredResources(result);
        try {
          console.log("searching")
          const res: any = await search_db(data, selectedTags, selectedTypes, selectedTopics, 1, 10);
          const savedData = saveToLocalStorage(res.resources)
          setResources(savedData);
          setSearchResults(res.resources);
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
            {isLoading &&
              <div className="p-1 px-2 text-sm text-gray-800 rounded bg-gray-50 dark:bg-gray-800 dark:text-gray-300">no results found locally searching for "{query}"</div>
            }
            {/* Show filtered Data */}
            {searchResults && searchResults.length > 0 &&
              searchResults.map((item: Resources, index: number) => (
                <div key={index} className="truncate md:text-base text-sm">
                  <Link to={`/resource/${item.title.toLowerCase()}`} className="font-semibold hover:underline hover:text-blue-600 px-0 capitalize">
                    {item.title}
                  </Link>
                  <span> {" "}
                    {item.description}
                  </span>
                </div>
              ))
            }
            {searchResults && searchResults.length === 0 &&
              <div className="text-sm font-medium alert py-1 mb-0 rounded">No Results found</div>
            }
          </Card>
        </div>
      }

      {/* Allow search bar to first show the results */}
    </div>
  );
};
