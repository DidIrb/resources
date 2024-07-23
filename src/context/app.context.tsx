import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import { Resources } from "@/types/data.types";

export const url: string = import.meta.env.VITE_BACKEND_URL;

interface AppContextType {
    resources: Resources[];
    fetchData: () => Promise<void>;
    openEditForm: (data: any) => void;
    resource: any;
    open: boolean;
    isLoading: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [resources, setResources] = useState<Resources[]>([]);
    const [resource, setResource] = useState<any>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (): Promise<void> => {
        try {
            setIsLoading(true)
            const response: AxiosResponse<Resources[]> = await axios.get<Resources[]>(`${url}/resources`);
            setResources(response.data);
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 3000);
        }
    };

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
        <AppContext.Provider value={{ resources, fetchData, openEditForm, open, resource, isLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider