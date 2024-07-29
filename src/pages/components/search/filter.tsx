import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useData } from "@/context/data.context";
import { useSearch } from "@/context/search.context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Filter() {
  const { types, tags, fetchData } = useData();
  const fields = ['title', 'description'];
  const [isLoading, setIsLoading] = useState(false);
  const { handleTypes, handleTags, handleFields, selectedFields, selectedTypes, selectedTags } = useSearch();

  const Reload = () => {
    setIsLoading(true);
    try {
      fetchData();
      toast.success("Data fetched successfully");
    } catch (error) {
      toast.error("An error occurred while fetching data");
    } finally {
      setTimeout(() => { setIsLoading(false) }, 1000);
    }
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild >
        <Button variant="outline" size="icon" className="w-8 rounded-full" >
          <SlidersHorizontal className="icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2" align="start" >
        <DropdownMenuLabel className="font-medium  flex items-center">Search parameters

          <ReloadIcon className={`icon ${isLoading && 'animate-spin'} h-3 cursor-pointer`} onClick={Reload} />

        </DropdownMenuLabel>
        <div className="flex gap-2 px-1 flex-wrap">
          {
            fields.map((fields, index: number) => (
              <Button key={index}
                variant={selectedFields.includes(fields) ? "default" : "secondary"}
                className={`h-6 px-2 rounded-full `}
                onClick={() => handleFields(fields)}
              >
                {fields}
              </Button>
            ))
          }
        </div>
        <DropdownMenuLabel className="font-medium"> filter types
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
        <DropdownMenuLabel className="font-medium">filter tags</DropdownMenuLabel>
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

      </DropdownMenuContent>
    </DropdownMenu>
  );
}