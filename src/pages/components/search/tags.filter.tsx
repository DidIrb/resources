import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/app.context';
import React, { useState } from 'react';

interface TagsFilterProps {
    allTags: string[];
    error: string;
    onTagSelect: (tags: string[]) => void;
}

const TagsFilter: React.FC<TagsFilterProps> = ({ allTags, error, onTagSelect }) => {
    const { resource } = useApp();
    const defTags = resource?.tags || [];
    
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>(defTags);

    const filteredTags = allTags
        .filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        // .slice(0, 6); // removed limitation of 6 tags

    const isHighlighted = (tag: string) => {
        return selectedTags.includes(tag) && allTags.includes(tag);
    };

    const handleTagSelect = (tag: string) => {
        const isTagSelected = selectedTags.includes(tag);
        if (isTagSelected) {
            setSelectedTags((prevSelectedTags) =>
                prevSelectedTags.filter((prevTag) => prevTag !== tag)
            );
            const filteredTags = selectedTags.filter((prevTag) => prevTag !== tag);
            onTagSelect(filteredTags);
        } else {
            setSelectedTags((prevSelectedTags) => [...prevSelectedTags, tag]);
            const updatedTags = [...selectedTags, tag];
            onTagSelect(updatedTags);
        }
    };

    return (
        <div>
            <Input
                type="text"
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap my-2 gap-1 text-sm">
                {filteredTags.map((tag) => (
                    <div className={`${isHighlighted(tag) ? 'bg-green-200  dark:bg-gray-400' : 'bg-gray-100  dark:bg-gray-800'} cursor-pointer px-3 rounded relative max-w-[48%]`} key={tag} onClick={() => handleTagSelect(tag)}>
                        {tag}
                    </div>
                ))}
            </div>

            <div className='text-sm mb-1'>Selected tags: {selectedTags.length} / {allTags.length}</div>
            <div className={`${error && selectedTags.length == 0 && "text-red-700 border-red-600"} border bg-background p-2 max-h-24 overflow-auto`}>
                {selectedTags.length == 0 ?
                    <div className="text-sm">
                        Choose tags
                    </div>
                    :
                    <div className='flex flex-wrap gap-1'>
                        {selectedTags.map((tag) => (
                            <Badge onClick={() => handleTagSelect(tag)} className='hover:bg-red-300 cursor-pointer font-normal' variant="outline" key={tag}>{tag}
                            </Badge>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default TagsFilter;
