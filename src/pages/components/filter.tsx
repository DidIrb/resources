import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/app.context";
import { useData } from "@/context/data.context";
import { ListFilter } from "lucide-react";

export function DropdownMenuCheckboxes() {
  const {types} = useData();
  const {handleButtonClick, selectedTypes} = useApp();

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild >
        <Button variant="ghost" type="button" className="h-8 w-8 rounded-full" size="icon">
          <ListFilter className="icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96" align="start" >
        <DropdownMenuLabel>Filter by types</DropdownMenuLabel>
        <div className="flex gap-2 px-1 flex-wrap">
          {/* Filter Using Types */}
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
          <DropdownMenuLabel>Filter by tags</DropdownMenuLabel>
          {/* Filter Using Tags */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}