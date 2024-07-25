// Settings.tsx
import React, { useState } from 'react';
import { useAuth } from "@/context/auth.context";
import { Profile } from "../common/profile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import TagsForm from '../forms/enums/tags.form';
import TypesForm from '../forms/enums/type.form';
import { useData } from '@/context/data.context';

export const Settings: React.FC = () => {
  const { session } = useAuth();
  const [showTagsForm, setShowTagsForm] = useState(false);
  const [showTypesForm, setShowTypesForm] = useState(false);
  const { tags, types,  fetchData} = useData();

  const handleFormSuccess = (formType: 'tags' | 'types') => {
    console.log('Form submitted successfully');
    fetchData();
    if (formType === 'tags') {
      setShowTagsForm(false);
    } else if (formType === 'types') {
      setShowTypesForm(false);
    }
  };

  return (
    <div className="px-4 flex justify-between md:flex-row gap-3 flex-col-reverse">
      <Profile />

      {session.role === "super_admin" && "Protected Here"}
      <Card className="flex-1">
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">Danger alert!</span> Be extremely careful with tags and types, once created they cannot be deleted
        </div>
        <div className="p-3">
          <div className="title mb-2 font-medium">Resource type</div>
          <Card className="p-3 pt-2">
            {tags.map((tag, index) => (
              <Badge key={index} className='mr-1' variant="outline">
                {tag}
              </Badge>
            ))}
          </Card>
          <div className="title my-2 font-medium">Resource tags</div>
          <Card className="p-3 pt-2">
            {types.map((type, index) => (
              <Badge key={index} className='mr-1' variant="outline">
                {type}
              </Badge>
            ))}

          </Card>
          <div className="font-medium mt-2">Resource tags and types Forms</div>
          <div className="flex gap-2">
            {!showTagsForm ?
              <Button variant="outline" className='mt-2 rounded-full' onClick={() => setShowTagsForm(true)}>
                Add New Tag
              </Button>
              : (
                <TagsForm onClose={() => setShowTagsForm(false)} onSuccess={() => handleFormSuccess('tags')} />
              )}
            {!showTypesForm ?
              <Button variant="outline" className='mt-2 rounded-full' onClick={() => setShowTypesForm(true)}>
                Add New Type
              </Button>
              : (
                <TypesForm onClose={() => setShowTypesForm(false)} onSuccess={() => handleFormSuccess('types')} />
              )}
          </div>
        </div>
      </Card>
    </div>
  );
};
