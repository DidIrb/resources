import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { debounce, filterByValue } from "@/lib/func";
import { GridIcon } from "@radix-ui/react-icons";
import { List, Search } from "lucide-react";
import { ChangeEvent, useCallback, useState } from "react";
import { DropdownMenuCheckboxes } from "./filter";
import { useSearch } from "@/context/search.context";

export const SearchBar = () => {
  const { resources, setFilteredResources, search, selectedFields, selectedTypes, selectedTags } = useSearch(); 
  const [isGrid, setIsGrid] = useState(true);

  const handleToggle = () => {
    setIsGrid(!isGrid);
  };

  const handleSearch = useCallback(
    debounce(async (query: string) => {
      const filteredData = filterByValue(resources, query);
      if (filteredData.length === 0) {
        console.log("searching database");
        await search(query, selectedTags, selectedTypes, selectedFields); // Call the search method with fields
      } else {
        setFilteredResources(filteredData);
      }
    }, 1000),
    [resources, setFilteredResources, search, selectedTypes]
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  return (
    <div className="ml-auto flex gap-2 flex-1 sm:flex-initial">
      <div className="flex gap-1 justify-end">
        <Button variant="outline" className="w-8 rounded-full" size="icon" onClick={handleToggle}>
          {isGrid ? <GridIcon className="icon" /> : <List className="icon" />}
        </Button>
        <DropdownMenuCheckboxes />
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
