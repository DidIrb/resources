import { Input } from "@/components/ui/input";
import { useApp } from "@/context/app.context";
import { debounce, filterByValue } from "@/lib/func";
import { Search } from "lucide-react";
import { ChangeEvent, useCallback } from "react";
import { DropdownMenuCheckboxes } from "./filter";

export const SearchBar = () => {
  const { resources, setFilteredResources } = useApp();



  const handleSearch = useCallback(
    debounce((query: string) => {
      const filteredData = filterByValue(resources, query);
      if (filteredData.length === 0) {
        console.log("searching database");

      }
      setFilteredResources(filteredData);
    }, 1000),
    [resources, setFilteredResources]
  );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  return (
    <div className="ml-auto flex gap-2 flex-1 sm:flex-initial">
      <DropdownMenuCheckboxes />
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
