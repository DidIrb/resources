import { useApp } from "@/context/app.context";
import Resource from "../components/resource";
import { ResourcesForm } from "../forms/resource.form";
import { useAuth } from "@/context/auth.context";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearch } from "@/context/search.context";
import { toast } from "sonner";

export const Dashboard = () => {
  const { open, openEditResource } = useApp();
  const {filteredResources, resources, search, isLoading} = useSearch();
  const { session } = useAuth();
  const reload = () => {
    try {
      search('', [], [], [], "desc", 1, 2);
      toast.success('Reloaded successfully');
    } catch (error:any) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <div className="p-0 px-4 overflow-hidden ">
      <div className="flex gap-3 flex-wrap w-full">
        {filteredResources.length > 0 &&
          filteredResources.map((resource: any) => (
            <div key={resource.id} className="sm:w-72 w-full">
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

      {/* Listing Resources form */}

      <div className="fixed bottom-3 left-[50%] -translate-x-[50%]  p-2 rounded-xl bg-white/20 ring-1 ring-black/5 shadow">
        {session &&
          <div className="flex gap-2 items-center">
            <Button variant="outline" className={`h-8 ${isLoading && 'w-8'} rounded-full`}  size={`${isLoading ? 'icon' : 'default'}`} onClick={reload} >
              {isLoading ?
                <ReloadIcon className={`icon ${isLoading ? 'animate-spin infinite' : ''} cursor-pointer`} />
                :
                "Reload"
              }
            </Button>
            <Button className=" rounded-full" onClick={() => openEditResource(null)} >
              Create
            </Button>
          </div>
        }
      </div>

      <ResourcesForm open={open} toggleOpenState={openEditResource} />
    </div>
  );
};
