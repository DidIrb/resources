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
    selectedFields: string[];
    selectedTopics: string[];
    query: string;
    setQuery: (query: string) => void;
    search: (query: string, tags: string[], types: string[], fields: string[], order: 'asc' | 'desc', page: number, pageSize: number) => void;
    handleTypes: (type: string) => void;
    handleTags: (tag: string) => void;
    handleTopics: (topic: string) => void;
    handleFields: (field: string) => void;
    setFilteredResources: (resources: Resources[]) => void;
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
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [selectedFields, setSelectedFields] = useState<string[]>(["title", "description"]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState<string>("");

    const search = async (query: string, tags: string[], types: string[], fields: string[], order: 'asc' | 'desc', page: number, pageSize: number) => {
        try {
            setIsLoading(true);
            const response: AxiosResponse<{ totalMatches: number; paginatedResults: Resources[] }> = await axios.get(
                `${config.url}/search`,
                {
                    params: {
                        query, fields: fields.join(','), tags: tags.join(','),
                        type: types.join(','), order, page, pageSize
                    }
                }
            );
            const savedData = saveToLocalStorage(response.data.paginatedResults)

            setFilteredResources(savedData);
            setResources(savedData);
            const res = { data: response.data.paginatedResults, matches: response.data.totalMatches }
            return res;
        } catch (error) {
            throw error;
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
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
            } else {
                try {
                    return await search('', selectedTags, filter, [], "asc", 1, 20);
                } catch (error: any) {
                    toast.error(error.response.data.error)
                }
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
                    await search('', selectedTags, filter, [], "asc", 1, 20);
                } catch (error: any) {
                    toast.error(error.response.data.error);
                }
            }
        } else {
            setFilteredResources(resources);
        }
    };
    const handleTopics = async (value: string) => {
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
            const existingResource = resources.find(resource => resource.topic.includes(value));
            if (existingResource) {
                const filteredResources = filterTags(resources, filter);
                setSelectedTopics(filteredResources);
            } else {
                // try { 
                //     await search('', selectedTags, filter, [], "asc", 1, 20);
                // } catch (error: any) {
                //     toast.error(error.response.data.error);
                // }
            }
        } else {
            setFilteredResources(resources);
        }
    };


    const handleFields = (field: string) => {
        setSelectedFields(prevFields => {
            if (prevFields.includes(field)) {
                return prevFields.filter(f => f !== field);
            } else {
                return [...prevFields, field];
            }
        });
    };

    return (
        <SearchContext.Provider value={{ resources, setQuery, query, handleTopics, setResources, selectedTopics, filteredResources, isLoading, search, handleTypes, handleTags, handleFields, selectedTypes, selectedTags, selectedFields, setFilteredResources }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
