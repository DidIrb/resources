import { useApp } from "@/context/app.context";
import Resource from "../components/resource";
import { ResourcesForm } from "../components/resource.form";

export const Dashboard = () => {
  const { filteredResources, resources, open, openEditForm } = useApp();

  return (
    <div className=" p-0 overflow-hidden">
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
          <button className="h-8 text-blue-700" onClick={() => openEditForm(null)} >
            Add Resource
          </button>
        </div>
      )}

      <ResourcesForm open={open} toggleOpenState={openEditForm} />
    </div>
  );
};
