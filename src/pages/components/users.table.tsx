import { Alert } from "@/components/custom/alert.dialog";
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import config from "@/config/config";
import { useApp } from "@/context/app.context";
import api from "@/lib/api";
import { User } from "@/types/forms.types";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { AxiosResponse } from "axios";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { toast } from "sonner";

export const UsersTable = forwardRef((_props, ref) => {
    const { openEditUser, setUsers, setIsLoading, users } = useApp();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [secretValue, setSecretValue] = useState<string>('');
    const [error, setError,] = useState<string>('');
    const [toDelete, setToDelete,] = useState<any>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!secretValue) {
            setError('This field cannot be empty');
        } else {
            setError('');
            try {
                const response = await api.post(`/users/${toDelete?.id}`, { secret: secretValue });
                toast.success(response.data.message);
            } catch (error: any) {
                toast.error(error.response.data.error);
            } finally {
                setIsLoading(false)
                setOpen(false);
                setToDelete(null)
                setSecretValue("")
            }
        }
    };

    const fetchUsersData = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const response: AxiosResponse<User[]> = await api.get<User[]>(`${config.url}/users`);
            setUsers(response.data);
            if (response.status === 200) {
                setOpen(false);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response.data.error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };

    useImperativeHandle(ref, () => ({
        fetchUsersData
    }));

    const deleteData = (data: any) => {
        setToDelete(data)
        setIsDialogOpen(true)
    }

    useEffect(() => {
        if (users.length === 0) {
            fetchUsersData()
            console.log("fetching data conditional");
        }
    }, []);

    return (
        <Card className="md:w-[700px] w-full p-1 pb-3">
            <Table>
                <TableCaption>List of users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">id</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                {users.length > 0
                    ?
                    <TableBody>
                        {users.map((item: User, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.username}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell >{item.role}</TableCell>
                                <TableCell className="flex gap-2 justify-end">
                                    <Pencil1Icon className="icon cursor-pointer" onClick={() => openEditUser(item)} />
                                    <TrashIcon className="icon cursor-pointer hover:text-red-600" onClick={() => deleteData(item)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    :
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No Record Found
                            </TableCell>
                        </TableRow>
                    </TableBody>
                }
            </Table>
            <Alert
                title={`Confirm ${toDelete?.username}'s Account Deletion`}
                message="This is a dangerous action. Are you sure you want to delete this account?"
                onConfirm={() => setOpen(true)}
                onCancel={() => setIsDialogOpen(false)} // Pass the cancel handler
                isOpen={isDialogOpen}
            />
            {open &&
                <div className="fixed bottom-3 border left-[50%] md:w-96 w-80 -translate-x-[50%] rounded shadow-md p-2">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2 text-sm">Authorize Deletion</div>
                        
                        <div className='flex gap-2 items-end'>
                            <Input
                                type="text"
                                className='w-full'
                                placeholder='Enter secret value'
                                value={secretValue}
                                onChange={(e) => setSecretValue(e.target.value)}
                            />
                            <Button variant="destructive" type="submit">Delete</Button>
                        </div>
                        {error && !secretValue && <span className="text-red-500 text-sm">{error}</span>}
                    </form>
                </div>
            }
        </Card>
    )
})
