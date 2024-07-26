import { Resources, User } from '@/types/forms.types';
import { createContext, useContext, useState } from "react";
import SearchProvider from './search.context';

interface AppContextType {
    user: User | null;
    open: boolean;
    isLoading: boolean;
    openUserForm: boolean;
    users: User[];
    resource: Resources | null;
    setUsers: (user: any) => void;
    setIsLoading: (isLoading: boolean) => void;
    openEditResource: (data: any) => void;
    openEditUser: (data: any) => void;
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
    const [users, setUsers] = useState<User[]>([]);
    const [openUserForm, setOpenUserForm] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [resource, setResource] = useState<Resources | null>(null);

    const openEditResource = (values: any) => {
        setOpen((prev) => !prev);
        if (values !== null) {
            setResource(values);
        } else {
            setResource(null);
        }
    };

    const openEditUser = (data: any) => {
        setOpenUserForm((prev) => !prev);
        if (data !== null) {
            setUser(data);
        } else {
            setUser(null);
        }
    };

    return (
        <AppContext.Provider value={{ openUserForm, openEditResource, users, setIsLoading, setUsers, open, resource, openEditUser, user, isLoading }}>
            <SearchProvider>
                {children}
            </SearchProvider>
        </AppContext.Provider>
    );
};

export default AppProvider;
