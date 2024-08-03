import React, { useState } from 'react';
import { useAuth } from "@/context/auth.context";
import { Profile } from "../common/profile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import TagsForm from '../forms/enums/tags.form';
import TypesForm from '../forms/enums/type.form';
import { useData } from '@/context/data.context';
import api from '@/lib/api';
import { toast } from 'sonner';
import { DownloadIcon, ReloadIcon } from '@radix-ui/react-icons';
import { LoadingButton } from '@/components/custom/loading.btn';
import TopicsForm from '../forms/enums/topic.form';

export const Settings: React.FC = () => {
  const { session } = useAuth();
  const [showTagsForm, setShowTagsForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sitemap, setSitemap] = useState("");
  const [showTypesForm, setShowTypesForm] = useState(false);
  const [showTopicsForm, setShowTopicsForm] = useState(false);
  const { tags, types, topics, fetchData } = useData();

  const handleFormSuccess = (formType: 'tags' | 'types' | 'topics') => {
    fetchData();
    if (formType === 'tags') setShowTagsForm(false);
    else if (formType === 'types') setShowTypesForm(false);
    else if (formType === 'topics') setShowTopicsForm(false);
  };
  
  const generate = async () => {
    setIsLoading(true)
    try {
      const res = await api.get(`/sitemap`);
      setSitemap(res.data);
    } catch (error: any) {
      const message = error.response.data.message || "Internal Server Error"
      toast.error(message)
    } finally { setIsLoading(false) }
  }

  const download = () => {
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="px-4 flex justify-between md:flex-row gap-3 flex-col-reverse">
      <Profile />

      {session?.role === "super_admin" &&
        <Card className="flex-1">
          <div className="alert rounded-b-none" role="alert">
            <span className="font-medium">Danger alert!</span> Be extremely careful with tags and types, once created they cannot be deleted
          </div>
          <div className="p-3 pt-0">
            <div className="title mb-1 font-medium">Filter tags </div>
            <Card className="p-2 pt-1">
              {tags.map((item: string, index: number) => (
                <Badge key={index} className='mr-1 font-medium' variant="outline">
                  {item}
                </Badge>
              ))}
            </Card>
            <div className="title my-2 font-medium">Filter type</div>
            <Card className="p-2 pt-1">
              {types.map((item: string, index: number) => (
                <Badge key={index} className='mr-1 font-medium' variant="outline">
                  {item}
                </Badge>
              ))}
            </Card>
            <div className="title my-2 font-medium">Filter topics</div>
            <Card className="p-2 pt-1">
              {topics.map((item: string, index: number) => (
                <Badge key={index} className='mr-1 font-medium' variant="outline">
                  {item}
                </Badge>
              ))}
            </Card>

            <div className="title my-2 font-medium">Types and Tags Form</div>
            {/* Add tag and type forms */}
            <div className="flex md:flex-row gap-2 mt-3 flex-col-reverse">
              {!showTagsForm
                ? <Button variant="outline" className='rounded-full self-start' onClick={() => setShowTagsForm(true)}> add tag </Button>
                : <TagsForm onClose={() => setShowTagsForm(false)} onSuccess={() => handleFormSuccess('tags')} />
              }
              {!showTypesForm
                ? <Button variant="outline" className='rounded-full column--shrunk' onClick={() => setShowTypesForm(true)}> add type </Button>
                : <TypesForm onClose={() => setShowTypesForm(false)} onSuccess={() => handleFormSuccess('types')} />
              }
              {!showTopicsForm
                ? <Button variant="outline" className='rounded-full column--shrunk' onClick={() => setShowTopicsForm(true)}> add topic </Button>
                : <TopicsForm onClose={() => setShowTopicsForm(false)} onSuccess={() => handleFormSuccess('topics')} />
              }
            </div>
          </div>
          {!sitemap ?
            <LoadingButton className='m-3 mt-0' loading={isLoading} onClick={generate}>Generate Sitemap</LoadingButton>
            :
            <Card className='flex flex-col h-72 relative m-3 mt-0'>
              <div className="w-full flex gap-1 justify-between items-center pl-4 p-2 bg-gray-100">
                <div className="">Sitemap.xml</div>
                <div className="flex">
                  <Button variant="outline" size="icon" onClick={generate} aria-label='Reload Page'>
                    <ReloadIcon />
                  </Button>
                  <Button variant="outline" size="icon" onClick={download} aria-label='Download'>
                    <DownloadIcon />
                  </Button>
                </div>
              </div>
              <div className="font-mono flex-1 pb-5 pl-2 text-sm whitespace-pre-wrap overflow-auto">
                {sitemap}
              </div>
            </Card>
          }
        </Card>
      }

    </div>
  );
};
