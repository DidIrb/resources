import React from 'react';
import { Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import { CalendarDays, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

type Item = {
    icon: string;
    name: string;
    description: string;
    date: string;
    website: string;
};

type ResourceProps = {
    item: Item;
};

const Resource: React.FC<ResourceProps> = ({ item }) => {
    return (
        <div className="border shadow-sm w-80 p-3 rounded-md">
            <div className="flex items-center gap-2 mb-2">
                <Avatar className="w-7 h-7">
                    <AvatarImage src={item.icon} />
                    <AvatarFallback>{item.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h4 className="font-semibold">@{item.name}</h4>
            </div>
            <div className="space-y-1">
                <p className="text-sm">
                    {item.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                    <div className="flex">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                            {item.date}
                        </span>
                    </div>
                    <Link to={item.website} target="_blank" className="text-muted-foreground text-xs items-center flex gap-1">
                        <Globe className="icon-link"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Resource;