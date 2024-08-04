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

export interface SearchContextType {
    resources: Resources[];
    filteredResources: Resources[] | null;
    selectedTypes: string[];
    selectedTags: string[];
    selectedTopics: string[];
    query: string;
    filteredData: any;
    setQuery: (query: string) => void;
    search_db: (query: string, tags: string[], types: string[], topics: string[], page: number, pageSize: number) => void;
    handleTypes: (type: string) => void;
    handleTags: (tag: string) => void;
    handleTopics: (topic: string) => void;
    setFilteredResources: (resources: Resources[]) => void;
    setFilteredData: (data: any) => void;
    setResources: (resources: Resources[]) => void;
    isLoading: boolean;
}