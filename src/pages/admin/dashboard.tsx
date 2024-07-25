import { useApp } from "@/context/app.context";
import Resource from "../components/resource";
import { ResourcesForm } from "../forms/resource.form";
import { useAuth } from "@/context/auth.context";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export const Dashboard = () => {
  const { filteredResources, resources, open, openEditResource, isLoading, fetchData } = useApp();
  const { session } = useAuth();

  return (
    <div className=" p-0 overflow-hidden">
      <div className="px-2 flex justify-end">
        {session &&
          <div className="flex gap-2 mb-2 items-center">
            <Button variant="outline" className={`h-7 ${isLoading && 'w-7'} rounded-full`}  size={`${isLoading ? 'icon' : 'default'}`} onClick={fetchData} >
              {isLoading ?
                <ReloadIcon className={`icon ${isLoading ? 'animate-spin infinite' : ''} cursor-pointer`} />
                :
                "Reload"
              }
            </Button>
            <Button className="h-7 rounded-full" onClick={() => openEditResource(null)} >
              Create
            </Button>
          </div>
        }
      </div>

      <div className="flex justify-center md:justify-start flex-wrap">
        {filteredResources.length > 0 &&
          filteredResources.map((resource: any) => (
            <div key={resource.id} className="flex flex-col gap-1 p-2">
              <Resource item={resource} />
            </div>
          ))}
      </div>
      {!resources && (
        <div className="text-sm">
          <span>No resources found</span>
          <button className="h-8 text-blue-700" onClick={() => openEditResource(null)} >
            Add Resource
          </button>
        </div>
      )}

      <ResourcesForm open={open} toggleOpenState={openEditResource} />
    </div>
  );
};
