import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ResourceValues } from "@/types/data.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReadMoreProps {
    data: ResourceValues;
}

export function ResourceDetails({ data }: ReadMoreProps) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <Avatar className="w-7 h-7 ">
                        <AvatarImage src={data.icon} />
                        <AvatarFallback>{data.title.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost" className="text-base hover:underline gap-1 px-0 h-0">
                        <h4 className="font-semibold">{data.title}</h4>
                    </Button>
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto max-w-[800px]">
                {JSON.stringify(data)}
            </HoverCardContent>
        </HoverCard>
    )
}
