import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app.context";
import { useAuth } from "@/context/auth.context";
import { useSearch } from "@/context/search.context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { ResourceList } from "../common/list";
import { ResourcesForm } from "../forms/resource.form";

export const Dashboard = () => {
  const { open, openEditResource } = useApp();
  const { search_db, isLoading } = useSearch();
  const { session } = useAuth();
  const reload = () => {
    try {
      const res: any = search_db('', [], [], [], 1, 10);
      if (res.status == 200) toast.success('Reloaded successfully');
      if (!res.status) {
          toast.error("Internal Server Error");
      }
    } catch (error: any) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <div className="p-0 px-4 overflow-hidden ">
      <ResourceList />
      
      <div className="fixed bottom-3 left-[50%] -translate-x-[50%]  p-2 rounded-xl bg-white/80 ring-1 ring-black/5 shadow">
        {session &&
          <div className="flex gap-2 items-center">
            <Button variant="outline" className={`h-8 ${isLoading && 'w-8'} rounded-full`} size={`${isLoading ? 'icon' : 'default'}`} onClick={reload} >
              {isLoading ?
                <ReloadIcon className={`icon ${isLoading ? 'animate-spin infinite' : ''} cursor-pointer`} />
                :
                "Reload"
              }
            </Button>
            <Button className="rounded-full" onClick={() => openEditResource(null)} >
              Create
            </Button>
          </div>
        }
      </div>

      <ResourcesForm open={open} toggleOpenState={openEditResource} />
    </div>
  );
};
