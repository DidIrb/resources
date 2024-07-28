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
  const { tags, types, fetchData } = useData();

  const handleFormSuccess = (formType: 'tags' | 'types') => {
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

      {session.role === "super_admin" &&
        <Card className="flex-1">
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">Danger alert!</span> Be extremely careful with tags and types, once created they cannot be deleted
          </div>
          <div className="p-3 pt-0">
            <div className="title mb-1 font-medium">Filter-(tags)</div>
            <Card className="p-2 pt-1">
              {tags.map((tag, index) => (
                <Badge key={index} className='mr-1 font-medium' variant="outline">
                  {tag}
                </Badge>
              ))}
            </Card>
            <div className="title my-2 font-medium">Filter-(type)</div>
            <Card className="p-2 pt-1">
              {types.map((type, index) => (
                <Badge key={index} className='mr-1 font-medium' variant="outline">
                  {type}
                </Badge>
              ))}
            </Card>
            <div className="font-medium my-2">Resource tags and types Forms</div>

            {/* Add tag and type forms */}
            <div className="flex md:flex-row gap-2 flex-col-reverse">
              {!showTagsForm
                ? <Button variant="outline" className='rounded-full self-start' onClick={() => setShowTagsForm(true)}> add tag </Button>
                : <TagsForm onClose={() => setShowTagsForm(false)} onSuccess={() => handleFormSuccess('tags')} />
              }
              {!showTypesForm
                ? <Button variant="outline" className='rounded-full column--shrunk' onClick={() => setShowTypesForm(true)}> add type </Button>
                : <TypesForm onClose={() => setShowTypesForm(false)} onSuccess={() => handleFormSuccess('types')} />
              }
            </div>
          </div>
        </Card>
      }
    </div>
  );
};
