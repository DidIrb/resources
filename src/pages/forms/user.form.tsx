import { LoadingButton } from "@/components/custom/loading.btn";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useApp } from "@/context/app.context";
import api from "@/lib/api";
import { User } from "@/types/forms.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import _ from "lodash";

type Props = {
    open: boolean;
    toggleOpenState: (bool: boolean) => void;
};



export const UsersForm: React.FC<Props> = ({ open, toggleOpenState }) => {
    const { user, users, setUsers } = useApp();
    const [isLoading, setIsLoading] = useState(false);

    const passwordSchema = z.string().min(8, {
        message: "Password must be at least 8 characters",
    })
        .refine((value) => /(?=(.*[a-z]){3,})/.test(value ?? ""), 'Must contain at least 3 lowercase characters')
        .refine((value) => /(?=(.*[A-Z]){2,})/.test(value ?? ""), 'Must contain at least 2 uppercase characters')
        .refine((value) => /(?=(.*[0-9]){2,})/.test(value ?? ""), 'Must contain at least 2 numbers')
        .refine((value) => /(?=(.*[!@#$%^&*()\-__+.]){1,})/.test(value ?? ""), 'Must contain at least 1 special character');

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Provide a username",
        }),
        email: z.string().email({
            message: "Please enter a valid email",
        }),
        password: user ? z.string() : passwordSchema,
        role: z.string(),
        secret: z.string().min(2, {
            message: "Provide Secret Key to protect your account",
        }),
    });

    const formVal = {
        username: "",
        email: "",
        password: "",
        role: "",
        secret: ""
    };

    const form = useForm<User>({
        resolver: zodResolver(formSchema),
        defaultValues : formVal
    });

    useEffect(() => {
        if (user !== null) {
            form.reset({
                username: user.username,
                email: user.email,
                role: user.role,
                secret: "",
                password: "",
            });
        } else {
            form.reset(formVal);
        }
    }, [user]);


    const onSubmit = async (data: User) => {
        setIsLoading(true);
        try {
            let response
            if (user) {
                response = await api.put(`/users/${user._id}`, data);
            } else {
                response = await api.post("/users", data);
            }
            toast.success(response?.data?.message)
            if (response.status == 201 || response.status == 200) {
                const user = response?.data?.user;
                const newUsers = _.unionBy([user], users, '_id');
                setUsers(newUsers);
                toggleOpenState(false);
                form.reset();
            }
        } catch (error: any) {
            toast.error(error.response.data.error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={toggleOpenState}>
            <SheetContent className="overflow-auto ">
                <SheetHeader>
                    <SheetTitle>{user ? "Edit" : "Create"} User</SheetTitle>
                    <SheetDescription>Managing Users</SheetDescription>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john_doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="johndoe@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {!user && 
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="123abcDE!1" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            } 
                            {user &&
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Role</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value} >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="user">User</SelectItem>
                                                            <SelectItem value="admin">Admin</SelectItem>
                                                            <SelectItem value="super_admin">SuperAdmin</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            }

                            <FormField
                                control={form.control}
                                name="secret"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Secret</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12345" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end !mt-4">
                                <LoadingButton loading={isLoading} type="submit">
                                    Submit
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

export default UsersForm;