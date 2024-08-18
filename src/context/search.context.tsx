import config from '@/config/config';
import { filterResources, saveToLocalStorage } from '@/lib/func';
import { SearchContextType } from '@/types/context.types';
import { Resources } from '@/types/forms.types';
import axios, { AxiosResponse } from 'axios';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  const [filteredResources, setFilteredResources] = useState<Resources[] | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<any>();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('query');
    const tagsParam = params.get('tags');
    const typesParam = params.get('types');
    const topicsParam = params.get('topics');

    if (queryParam) setQuery(queryParam);
    if (tagsParam) setSelectedTags(tagsParam.split(','));
    if (typesParam) setSelectedTypes(typesParam.split(','));
    if (topicsParam) setSelectedTopics(topicsParam.split(','));
  }, [location.search]);

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
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setTimeout(() => { setIsLoading(false) }, 1000);
    }
  };

  const handleTypes = async (value: string) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(value)
        ? prev.filter((t) => t !== value)
        : [...prev, value];

      const res = filterResources(resources, selectedTags, selectedTopics, updatedTypes);
      setFilteredResources(res);
      
      return updatedTypes;
    });
  };

  const handleTags = async (value: string) => {
    setSelectedTags((prev) => {
      const updatedTags = prev.includes(value)
        ? prev.filter((t) => t !== value)
        : [...prev, value];

      const res = filterResources(resources, updatedTags, selectedTopics, selectedTypes);
      setFilteredResources(res);

      return updatedTags;
    });
  };

  const handleTopics = (value: string) => {
    setSelectedTopics((prev) => {
      const updatedTopics = prev.includes(value)
        ? prev.filter((t) => t !== value)
        : [...prev, value];

      const res = filterResources(resources, selectedTags, updatedTopics, selectedTypes);
      setFilteredResources(res);

      return updatedTopics;
    });
  };

  return (
    <SearchContext.Provider value={{ resources, setQuery, setFilteredData, query, filteredData, handleTopics, setResources, selectedTopics, filteredResources, isLoading, search_db, handleTypes, handleTags, selectedTypes, selectedTags, setFilteredResources }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
