import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";
import config from "@/config/config";

interface DataContextType {
    tags: string[];
    types: string[];
    fetchData: () => Promise<void>;
    setIsGrid: (isGrid: boolean) => void;
    isGrid: boolean;
    isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};

const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tags, setTags] = useState<string[]>(() => {
        const savedTags = localStorage.getItem("tags");
        return savedTags ? JSON.parse(savedTags) : [];
    });

    const [types, setTypes] = useState<string[]>(() => {
        const savedTypes = localStorage.getItem("types");
        return savedTypes ? JSON.parse(savedTypes) : [];
    });
    const appConfig = JSON.parse(localStorage.getItem('config') || 'null');
    const [isGrid, setIsGrid] = useState<boolean>(() => {
        if (appConfig) return appConfig.isGrid
        else {
            localStorage.setItem("config", JSON.stringify({...appConfig, isGrid: true}));
            return true
        }
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const response = await api.get<{ tags: string[], types: string[] }>(`${config.url}/enum`);
            const { tags, types } = response.data;

            if (tags && types) {
                setTags(tags);
                setTypes(types);
                localStorage.setItem("tags", JSON.stringify(tags));
                localStorage.setItem("types", JSON.stringify(types));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }
    };

    useEffect(() => {
        if (!tags.length || !types.length) {
            fetchData();
        }
    }, []);

    return (
        <DataContext.Provider value={{ isGrid, setIsGrid, tags, types, fetchData, isLoading }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
