import config from '@/config/config';
import { saveToLocalStorage } from '@/lib/func';
import { Resources } from '@/types/forms.types';
import axios, { AxiosResponse } from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'sonner';

interface SearchContextType {
    resources: Resources[];
    filteredResources: Resources[];
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

const SearchContext = createContext<SearchContextType | null>(null);

export const useSearch = (): SearchContextType => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};

const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [resources, setResources] = useState<Resources[]>([]);
    const [filteredResources, setFilteredResources] = useState<Resources[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filteredData, setFilteredData] = useState<any>();
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState<string>("");

    const search_db = async (query: string, tags: string[], types: string[], topics: string[], page: number, pageSize: number) => {
        try {
            setIsLoading(true);
            const response: AxiosResponse<{ totalResults: number; resources: Resources[] }> = await axios.get(
                `${config.url}/search`,
                {
                    params: {
                        query: query, tags: tags.join(','),
                        type: types.join(','), topics: topics.join(','),
                        page, perPage: pageSize,
                    },
                }
            );

            const savedData = saveToLocalStorage(response.data.resources);
            setResources(savedData);
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setTimeout(() => { setIsLoading(false) }, 1000);
        }
    };

    const filterTypes = (resources: any[], selectedTypes: string[]) => {
        return resources.filter(resource => selectedTypes.includes(resource.type));
    };

    const filterTags = (resources: any[], selectedTags: string[]) => {
        return resources.filter((resource: Resources) =>
            resource.tags.some(tag => selectedTags.includes(tag))
        );
    };

    const handleTypes = async (value: string) => {
        let filter: string[] = [];
        setSelectedTypes(prev => {
            if (prev.includes(value)) {
                filter = prev.filter(t => t !== value);
                return prev.filter(t => t !== value);
            } else {
                filter = [...prev, value];
                return [...prev, value];
            }
        });

        if (filter.length > 0) {
            const existingResource = resources.find(resource => resource.type === value);
            if (existingResource) {
                const filteredResources = filterTypes(resources, filter);
                setFilteredResources(filteredResources);
            }
        } else {
            setFilteredResources(resources);
        }
    };


    const handleTags = async (value: string) => {
        let filter: string[] = [];
        setSelectedTags(prev => {
            if (prev.includes(value)) {
                filter = prev.filter(t => t !== value);
                return prev.filter(t => t !== value);
            } else {
                filter = [...prev, value];
                return [...prev, value];
            }
        });

        if (filter.length > 0) {
            const existingResource = resources.find(resource => resource.tags.includes(value));
            if (existingResource) {
                const filteredResources = filterTags(resources, filter);
                setFilteredResources(filteredResources);
            } else {
                try {
                    await search_db('', selectedTags, selectedTypes, selectedTopics, 1, 10)
                } catch (error: any) {
                    toast.error(error.response.data.error);
                }
            }
        } else {
            setFilteredResources(resources);
        }
    };
    const handleTopics = (field: string) => {
        setSelectedTopics(prevFields => {
            if (prevFields.includes(field)) {
                return prevFields.filter(f => f !== field);
            } else {
                return [...prevFields, field];
            }
        });
    };

    return (
        <SearchContext.Provider value={{ resources, setQuery,setFilteredData, query, filteredData, handleTopics, setResources, selectedTopics, filteredResources, isLoading, search_db, handleTypes, handleTags, selectedTypes, selectedTags, setFilteredResources }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
