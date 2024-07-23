import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { CalendarDays, Edit2Icon, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useAuth } from '@/context/auth.context';
import { useApp } from '@/context/app.context';

type Item = {
    icon: string;
    title: string;
    description: string;
    date: string;
    website: string;
};

type ResourceProps = {
    item: Item;
};

const Resource: React.FC<ResourceProps> = ({ item }) => {
    const { session } = useAuth();
    const { openEditForm } = useApp()
    return (
        <div className="border shadow-sm w-80 p-3 rounded-md">
            <div className="flex items-center justify-between mb-2">
                <div className='flex items-center  gap-2'>

                    <Avatar className="w-7 h-7">
                        <AvatarImage src={item.icon} />
                        <AvatarFallback>{item.title.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold capitalize">{item.title}</h4>
                </div>

                {!session && <Pencil1Icon className='icon cursor-pointer' onClick={() => openEditForm(item)} />}
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
                        <Globe className="icon-link" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Resource;