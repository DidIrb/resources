import { useApp } from "@/context/app.context";
import { useAuth } from "@/context/auth.context";
import { ResourceValues } from "@/types/data.types";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { CalendarDays, Globe } from "lucide-react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { ResourceDetails } from "./resource.details";

type ResourceProps = {
  item: ResourceValues;
};

const Resource: React.FC<ResourceProps> = ({ item }) => {
  const { session } = useAuth();
  const { openEditResource } = useApp();
  return (
    <div className="border shadow-sm sm:w-72 w-full p-3 rounded-md">
      <div className="flex items-center justify-between mb-2">
        <ResourceDetails data={item} />
        {session && (
          <Pencil1Icon
            className="icon-sm cursor-pointer"
            onClick={() => openEditResource(item)}
          />
        )}
      </div>
      <div className="space-y-1">
        <p
          className="text-sm relative"
          style={{
            WebkitLineClamp: 2,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.description}
          {/* {item.description.length > 65 && (
                        <Link to={item.link} target="_blank" className=" absolute bg-background pl-1 bottom-0 right-0 bg font-medium">
                            <Button variant="link" className="pl-1 flex items-center gap-1 px-0 h-0">
                                <span>...
                                </span>  <span className="text-blue-800">Read more</span>
                            </Button>
                        </Link>
                    )} */}
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
          <Link
            to={item.link}
            target="_blank"
            className="text-muted-foreground hover:text-blue-700 text-xs items-center flex gap-1"
          >
            <Globe className="icon-link" />
            Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resource;
