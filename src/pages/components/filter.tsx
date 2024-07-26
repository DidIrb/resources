import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useData } from "@/context/data.context";
import { useSearch } from "@/context/search.context";
import { SlidersHorizontal } from "lucide-react";

export function DropdownMenuCheckboxes() {
  const { types, tags } = useData();
  const fields = ['title', 'description'];
  const { handleTypes, handleTags, handleFields, selectedFields, selectedTypes, selectedTags } = useSearch();

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild >
        <Button variant="outline" size="icon" className="w-8 rounded-full" >
          <SlidersHorizontal className="icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2" align="start" >
        <DropdownMenuLabel className="font-medium">Search parameters</DropdownMenuLabel>
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
        <DropdownMenuLabel className="font-medium">filter types</DropdownMenuLabel>
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