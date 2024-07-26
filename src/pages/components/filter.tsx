import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useData } from "@/context/data.context";
import { useSearch } from "@/context/search.context";
import { SlidersHorizontal } from "lucide-react";

export function DropdownMenuCheckboxes() {
  const {types, tags} = useData();
  const {handleButtonClick, handleTagClick, selectedTypes, selectedTags} = useSearch();

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild >
        <Button variant="outline" size="icon" className="w-8 rounded-full" >
          <SlidersHorizontal className="icon"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2" align="start" >
        <DropdownMenuLabel>filter by types</DropdownMenuLabel>
        <div className="flex gap-2 px-1 flex-wrap">
          {
            types.map((type, index: number) => (
              <Button key={index}
              variant={selectedTypes.includes(type) ? "default" : "secondary"}
              className={`h-6 px-2 rounded-full `}
              onClick={() => handleButtonClick(type)}
              >
                {type}
              </Button>
            ))
          }
        </div>
          <DropdownMenuLabel>filter by tags</DropdownMenuLabel>
          <div className="flex gap-2 px-1 flex-wrap">
          {
            tags.map((tag, index: number) => (
              <Button key={index}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className={`h-6 px-2 rounded-full `}
              onClick={() => handleTagClick(tag)}
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