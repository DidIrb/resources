import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useApp } from "@/context/app.context";
import { ListFilter } from "lucide-react";

export function DropdownMenuCheckboxes() {
  const types = ["blogs", "tutorials", "tools", "articles", "guides", "website", "applications", ];
  const {handleButtonClick, selectedTypes} = useApp();

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild >
        <Button variant="ghost" type="button" className="h-8 w-8 rounded-full" size="icon">
          <ListFilter className="icon" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start" >
        {/* <DropdownMenuLabel>Filter Resources</DropdownMenuLabel> */}
        <div className="flex gap-2 px-1 flex-wrap">
          {
            types.map((type, index: number) => (
              <Button key={index}
                variant={selectedTypes.includes(type) ? "default" : "outline"}
                className={`h-6 px-2 rounded-full `}
                onClick={() => handleButtonClick(type)}
              >
                {type}
              </Button>
            ))
          }
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}