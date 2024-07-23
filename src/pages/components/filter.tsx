import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

export function DropdownMenuCheckboxes() {
  const types = ["Blogs", "Tutorials", "Tools", "Articles", "Guides", "Websites", "Applications", ];
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleButtonClick = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((selectedType) => selectedType !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

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
            types.map((type) => (
              <Button
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