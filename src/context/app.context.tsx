import api from '@/lib/api';
import { Resources, User } from '@/types/forms.types';
import axios, { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from "react";
export const url: string = import.meta.env.VITE_BACKEND_URL;

interface AppContextType {
    user: User| null;
    resource: Resources | null;
    open: boolean;
    isLoading: boolean;
    openUserForm: boolean;
    users: User[];
    resources: Resources[];
    selectedTypes: string[];
    filteredResources: Resources[];
    fetchData: () => Promise<void>;
    search: (query: string) => void;
    handleButtonClick: (type: string) => void;
    setUsers: (user: any) => void;
    setIsLoading: (isLoading: boolean) => void;
    openEditResource: (data: any) => void;
    openEditUser: (data:  any) => void;
    setFilteredResources: (resources: Resources[]) => void;
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
    const [resources, setResources] = useState<Resources[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [openUserForm, setOpenUserForm] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [resource, setResource] = useState<Resources | null>(null);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [filteredResources, setFilteredResources] = useState<Resources[]>(resources);
    // const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
            const response: AxiosResponse<Resources[]> = await axios.get<Resources[]>(`${url}/resources`);
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
        const response: AxiosResponse<Resources[]> = await axios.get<Resources[]>(`${url}/resources/search`);
        setResources(response.data);
        setFilteredResources(response.data);
      }

    const openEditResource = (values: any) => {
        setOpen((prev) => !prev);
        if (values !== null) {
            setResource(values);
        } else {
            setResource(null)
        }
    };

    const openEditUser = (values: any) => {
        setOpenUserForm((prev) => !prev);
        if (values !== null) {
            setUser(values);
        } else {
            setUser(null)
        }
    };

    useEffect(() => { fetchData() }, []);

    return (
        <AppContext.Provider value={{ resources, openUserForm, fetchData, openEditResource, search, users, setIsLoading, setUsers, handleButtonClick, open, selectedTypes, resource, setFilteredResources, openEditUser, user, filteredResources, isLoading }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider