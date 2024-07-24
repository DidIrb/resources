import { useApp } from "@/context/app.context";
import { Navbar } from "@/layouts/components/navbar";
import Resource from "./components/resource";

export const Home = () => {
    const { filteredResources } = useApp();
    return (
        <div>
            <Navbar />
            <div className="container flex flex-wrap gap-6 py-3">
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource: any) => (
                        <div key={resource.id} className="flex flex-col gap-1 p-2">
                            <Resource item={resource} />
                        </div>
                    ))
                ) : (
                    <div className="text-sm">No resources found </div>
                )}
            </div>
        </div>
    )
}