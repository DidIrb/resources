import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app.context";
import { useAuth } from "@/context/auth.context";
import { useSearch } from "@/context/search.context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { ResourcesForm } from "../forms/resource.form";
import { ResourceList } from "../common/resource.list";

export const Dashboard = () => {
  const { open, openEditResource } = useApp();
  const { search, isLoading } = useSearch();
  const { session } = useAuth();
  const reload = () => {
    try {
      const res: any = search('', [], [], [], "desc", 1, 2);
      if (res.status == 200) toast.success('Reloaded successfully');
    } catch (error: any) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <div className="p-0 px-4 overflow-hidden ">
      <ResourceList />
      {/* Listing Resources form */}
      <div className="fixed bottom-3 left-[50%] -translate-x-[50%]  p-2 rounded-xl bg-white/20 ring-1 ring-black/5 shadow">
        {session &&
          <div className="flex gap-2 items-center">
            <Button variant="outline" className={`h-8 ${isLoading && 'w-8'} rounded-full`} size={`${isLoading ? 'icon' : 'default'}`} onClick={reload} >
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
