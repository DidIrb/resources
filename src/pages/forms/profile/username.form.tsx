// UsernameForm.tsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XIcon } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from '@/context/auth.context';

const usernameSchema = z.string().min(3, { message: "Username must be at least 3 characters" });

const formSchema = z.object({
    username: usernameSchema,
});

type FormSchema = z.infer<typeof formSchema>;

interface UsernameFormProps {
    userId: string;
    currentUsername: string;
    onClose: () => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ userId, currentUsername, onClose }) => {
    const { session, setSession } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: currentUsername,
        }
    });

    useEffect(() => {
        setValue('username', currentUsername);
    }, [currentUsername, setValue]);

    const handleUsernameSubmit = async (data: FormSchema) => {
        try {
            const response = await api.patch(`/users/${userId}`, { username: data.username });
            toast.success(response?.data?.message);
            if (response.status === 200) {
                setSession({ ...session, username: data.username })
                onClose();
                reset({ username: data.username });
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.ERROR);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleUsernameSubmit)}>
            <label className="block text-sm text-gray-700">Username</label>
            <div className="flex items-center gap-2">
                <div className="w-full relative">
                    <Input
                        type="text"
                        {...register('username')}
                    />
                </div>
                <Button type="submit">
                    Update
                </Button>
                <Button size="icon" className='icon rounded-full' variant="outline" type="button" onClick={onClose}>
                    <XIcon className='icon-link' />
                </Button>
            </div>
            {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
        </form>
    );
};

export default UsernameForm;
