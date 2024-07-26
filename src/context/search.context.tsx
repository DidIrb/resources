import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Resources } from '@/types/forms.types';
import axios, { AxiosResponse } from 'axios';
import config from '@/config/config';
import _ from 'lodash'; 
import { filterTags, filterTypes } from '@/lib/func';

interface SearchContextType {
    resources: Resources[];
    filteredResources: Resources[];
    selectedTypes: string[];
    selectedTags: string[];
    selectedFields: string[];
    search: (query: string, tags: string[], types: string[], fields: string[]) => void;
    handleButtonClick: (type: string) => void;
    handleTagClick: (tag: string) => void;
    handleFieldClick: (field: string) => void;
    setFilteredResources: (resources: Resources[]) => void;
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
    const [selectedFields, setSelectedFields] = useState<string[]>(['title', 'description']);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedResources = localStorage.getItem('resources');
        if (storedResources) {
            const parsedResources = JSON.parse(storedResources);
            setResources(parsedResources);
            setFilteredResources(parsedResources);
        } else {
            search('', [], [], []);
        }
    }, []);

    const saveResourcesToLocalStorage = (resources: Resources[]) => {
        localStorage.setItem('resources', JSON.stringify(resources));
    };
    
    const search = async (query: string, tags: string[], types: string[], fields: string[]) => {
        try {
            setIsLoading(true);
            const response: AxiosResponse<{ totalMatches: number, limitedResults: Resources[] }> = await axios.get(`${config.url}/resources/search`, {
                params: { query, fields: fields.join(','), tags: tags.join(','), type: types.join(',') }
            });
    
            const uniqueNewData = _.uniqBy(response.data.limitedResults, 'id');

            const updatedResources = [...resources, ...uniqueNewData];
            setResources(updatedResources);
            setFilteredResources(uniqueNewData);

            const existingData = JSON.parse(localStorage.getItem('resources') || '[]');
            const updatedData = [...existingData, ...uniqueNewData];
            const uniqueUpdatedData = _.uniqBy(updatedData, 'id');
            saveResourcesToLocalStorage(uniqueUpdatedData);
    
            console.log(`Showing ${uniqueNewData.length} out of ${response.data.totalMatches} items`);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleButtonClick = async (value: string) => {
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
                await search('', selectedTags, filter, []);
            }
        } else {
            setFilteredResources(resources);
        }
    };


    const handleTagClick = async (value: string) => {
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
            const existingResource = resources.find(resource =>  resource.tags.includes(value));
            if (existingResource) {
                const filteredResources = filterTags(resources, filter);
                setFilteredResources(filteredResources);
            } else {
                await search('', selectedTags, filter, []);
            }
        } else {
            setFilteredResources(resources);
        }
    };
    

    const handleFieldClick = (field: string) => {
        setSelectedFields(prevFields => {
            if (prevFields.includes(field)) {
                return prevFields.filter(f => f !== field);
            } else {
                return [...prevFields, field];
            }
        });
    };

    return (
        <SearchContext.Provider value={{ resources, filteredResources, isLoading, search, handleButtonClick, handleTagClick, handleFieldClick, selectedTypes, selectedTags, selectedFields, setFilteredResources }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
