import { Resources, User } from "./forms.types";

export interface AppContextType {
    user: User | null;
    open: boolean;
    isLoading: boolean;
    openUserForm: boolean;
    users: User[];
    resource: Resources | null;
    setUsers: (user: User[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    openEditResource: (data: any) => void;
    openEditUser: (data: any) => void;
}

