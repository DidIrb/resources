import { LoadingButton } from "@/components/custom/loading.btn";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TagsFilter from "./tags.filter";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/lib/api";
import { toast } from "sonner";


export type Tag = string;
export type ResourceType = string;

export interface Resources {
    icon: string;
    type: ResourceType;
    title: string;
    description: string;
    tags: Tag[];
    link: string;
    secret: string;
}

type Props = {
    open: boolean;
    toggleOpenState: (bool: boolean) => void;
};

export const ResourcesForm: React.FC<Props> = ({ open, toggleOpenState }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const allTags = ["coding", "github"];
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagSelect = (tags: any) => {
        setSelectedTags(tags);
    };

    const formSchema = z.object({

        title: z.string().min(2, {
            message: "This field is required!",
        }),
        description: z.string().min(2, {
            message: "This field is required!",
        }), 
        type: z.string().min(2, {
            message: "This field is required!",
        }),
        icon: z.string(),
        link: z.string().min(2, {
            message: "This field is required!",
        }),
        secret: z.string().min(2, {
            message: "This field is required!",
        }),
    });

    const form = useForm<Resources>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            icon: "",
            type: "",
            title: "",
            description: "",
            link: "",
            secret: ""
        },
    });

    // SET THE VALUES WHEN THERE IS DATA COMING FROM THE EDIT METHOD


    const onSubmit = async (data: Resources) => {
        if (selectedTags.length == 0) {
            setError("Tags are Empty");
        } else {
            setIsLoading(true);
            try {
                data.tags = selectedTags;
                const response = await api.post("/resources", data);
                toast.success(response?.data?.message)
                if (response.status == 200) {
                    toggleOpenState(false);
                    setSelectedTags([]);
                    setError("");
                    form.reset()
                }
            } catch (error: any) {
                console.log(error);
                toast.error(error.response.data.message)
            } finally {
                setIsLoading(false);
            }
        }
    };

    const type = form.watch("type");

    return (
        <Sheet open={open} onOpenChange={toggleOpenState}>
            <SheetContent className="sm:max-w-xl overflow-auto " side={"left"}>
                <SheetHeader>
                    <SheetTitle>Resources</SheetTitle>
                    <SheetDescription>There are millions of resources out there, Document Your Favorite Here. </SheetDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="This is a title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="This is a description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="tool">Tool</SelectItem>
                                                        <SelectItem value="website">Website</SelectItem>
                                                        <SelectItem value="app">App</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {type === "app" || type === "website" ? (
                                <FormField
                                    control={form.control}
                                    name="icon"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Image https://example.com/image" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ) : null}

                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Website: https://example.com/page" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="bg-gray-200 p-3 rounded-lg">
                                <TagsFilter allTags={allTags} error={error} onTagSelect={handleTagSelect} />
                            </div>
                            <FormField
                                control={form.control}
                                name="secret"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Secret Key</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12345" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end !mt-4">
                                <LoadingButton loading={isLoading} type="submit">
                                    Save
                                </LoadingButton>
                            </div>
                        </form>
                    </Form>
                </SheetHeader>
                <SheetFooter></SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default ResourcesForm;