import { ResourceType } from "@/pages/components/resource.form";
import axios, { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from "react";

export const url: string = import.meta.env.VITE_BACKEND_URL;

interface AppContextType {
    resources: ResourceType[];
    fetchData: () => Promise<void>;
    openEditForm: (data: any) => void;
    handleButtonClick: (type: string) => void;
    resource: any;
    open: boolean;
    isLoading: boolean;
    selectedTypes: string[];
    setFilteredResources: (resources: ResourceType[]) => void;
    filteredResources: ResourceType[];
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};

const filterResourcesBySelectedTypes = (resources: any[], selectedTypes: string | any[]) => {
    return resources.filter(resource => selectedTypes.includes(resource.type));
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [resources, setResources] = useState<ResourceType[]>([]);
    const [resource, setResource] = useState<any>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredResources, setFilteredResources] = useState<ResourceType[]>(resources);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const handleButtonClick = (type: string) => {
        let filter: string[] = [];
        setSelectedTypes(prevTypes => {
            if (prevTypes.includes(type)) {
                filter = prevTypes.filter(t => t !== type);
                return prevTypes.filter(t => t !== type);
            } else {
                filter = [...prevTypes, type];
                return [...prevTypes, type];
            }
        });
    
        if (resources.length > 0) {
            const filteredResources = filterResourcesBySelectedTypes(resources, filter);
            setFilteredResources(filteredResources);
        }
    };

    const fetchData = async (): Promise<void> => {
        try {
            setIsLoading(true)
            const response: AxiosResponse<ResourceType[]> = await axios.get<ResourceType[]>(`${url}/resources`);
            setResources(response.data);
            setFilteredResources(response.data);
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 3000);
        }
    };

    const search = async (query: string) => {
        selectedTypes
        // http://localhost:5890/api/v1/resources/search?tags=github&type=website&query=example&fields=title,description
        const response: AxiosResponse<ResourceType[]> = await axios.get<ResourceType[]>(`${url}/resources/search`);
        setResources(response.data);
        setFilteredResources(response.data);
      }

    const openEditForm = (values: any) => {
        setOpen((prev) => !prev);
        if (values !== null) {
            setResource(values);
        } else {
            setResource(null)
        }
    };

    useEffect(() => { fetchData() }, []);

    return (
        <AppContext.Provider value={{ resources, fetchData, openEditForm, handleButtonClick, open, selectedTypes, resource, setFilteredResources, filteredResources, isLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider