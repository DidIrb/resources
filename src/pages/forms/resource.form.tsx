import { LoadingButton } from "@/components/custom/loading.btn";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TagsFilter from "../components/search/tags.filter";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/lib/api";
import { toast } from "sonner";
import { useApp } from "@/context/app.context";
import { Resources } from "@/types/forms.types";
import { useData } from "@/context/data.context";
import { useSearch } from "@/context/search.context";

type Props = {
    open: boolean;
    toggleOpenState: (bool: boolean) => void;
};

export const ResourcesForm: React.FC<Props> = ({ open, toggleOpenState }) => {
    const { resource } = useApp();
    const { tags, types } = useData();
    const { search } = useSearch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
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

    const defaultValue = {
        icon: "",
        type: "",
        title: "",
        description: "",
        link: "",
        secret: ""
    };

    const form = useForm<Resources>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValue,
    });

    useEffect(() => {

        if (resource !== null) {
            form.reset({
                icon: resource.icon,
                type: resource.type,
                title: resource.title,
                description: resource.description,
                link: resource.link,
                secret: ""
            });
            if (resource.tags == null) {
                setSelectedTags([]);
            } else {
                setSelectedTags(resource?.tags);
            }
        } else {
            form.reset(defaultValue);
        }
    }, [resource]);


    const onSubmit = async (data: Resources) => {
        if (selectedTags.length == 0) {
            setError("Tags are Empty");
        } else {
            setIsLoading(true);
            try {
                let response
                data.tags = selectedTags;
                if (resource) {
                    response = await api.put(`/resources/${resource.id}`, data);
                } else {
                    response = await api.post("/resources", data);
                }
                toast.success(response?.data?.message)
                if (response.status == 200) {
                    await search(`${data.title}`, [], [], ["title"], "asc", 1, 1);
                    toggleOpenState(false);
                    setSelectedTags([]);
                    setError("");
                    form.reset();
                }
            } catch (error: any) {
                const message = error.response.data.error || "Internal Server Error";
                toast.error(message);
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
                    <SheetTitle>{resource ? "Edit" : "Create"} Resources</SheetTitle>
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
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {types.map((type) => (
                                                            <SelectItem key={type} value={type}>
                                                                {type}
                                                            </SelectItem>
                                                        ))}
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
                            <div className="border p-3 rounded-lg">
                                <TagsFilter allTags={tags} error={error} onTagSelect={handleTagSelect} />
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