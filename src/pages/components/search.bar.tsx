import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DropdownMenuCheckboxes } from "./filter";

export const SearchBar = () => {
  return (
    <form className="ml-auto flex gap-2 flex-1 sm:flex-initial">
      <DropdownMenuCheckboxes />
      <div className="relative w-full flex items-center">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search Resources..."
          className="pl-8 sm:w-full md:w-[300px] h-8 rounded-full lg:w-[400px]"
        />
      </div>
    </form>
  );
};
