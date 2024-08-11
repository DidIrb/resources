import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useApp } from "@/context/app.context";
import { useAuth } from "@/context/auth.context";
import { stripHTML } from "@/lib/stript.html";
import { Resources } from "@/types/forms.types";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { CalendarDays, ExternalLink } from "lucide-react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

type ResourceProps = {
  item: Resources;
};

const Resource: React.FC<ResourceProps> = ({ item }) => {
  const { session } = useAuth();
  const { openEditResource } = useApp();
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between mb-2">
        <Link to={`/resource/${item.title.toLowerCase()}`} className="flex items-center gap-2 cursor-pointer dark:text-gray-300 font-semibold hover:underline hover:text-blue-600 px-0">
          <Avatar className="w-7 h-7 ">
            <AvatarImage src={item.icon} />
            <AvatarFallback>{item.title.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {item.title}
        </Link>
        {(session?.role === "admin" || session?.role === "super_admin") && (
          <Pencil1Icon
            className="icon-sm cursor-pointer"
            onClick={() => openEditResource(item)}
          />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm relative truncate">
          {stripHTML(item.description)}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              {item.updatedAt
                ? moment.utc(item?.updatedAt).local().fromNow()
                : moment.utc(item?.createdAt).local().fromNow()}
            </span>
          </div>
          <Link to={item.link} target="_blank"
            className="text-muted-foreground hover:text-blue-700 text-xs items-center flex gap-1"
          >
            <ExternalLink className="icon-link" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default Resource;
