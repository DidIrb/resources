// PasswordForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { XIcon } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/api';
import { useAuth } from '@/context/auth.context';

const passwordSchema = z.string().min(8, {
  message: "Password must be at least 8 characters",
})
  .refine((value) => /(?=(.*[a-z]){3,})/.test(value ?? ""), 'Must contain at least 3 lowercase characters')
  .refine((value) => /(?=(.*[A-Z]){2,})/.test(value ?? ""), 'Must contain at least 2 uppercase characters')
  .refine((value) => /(?=(.*[0-9]){2,})/.test(value ?? ""), 'Must contain at least 2 numbers')
  .refine((value) => /(?=(.*[!@#$%^&*()\-__+.]){1,})/.test(value ?? ""), 'Must contain at least 1 special character');

const formSchema = z.object({
  password: passwordSchema,
});

type FormSchema = z.infer<typeof formSchema>;

interface PasswordFormProps {
  userId: string;
  onClose: () => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ userId, onClose }) => {
    const {session, setSession } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    }
  });

  const handlePasswordSubmit = async (data: FormSchema) => {
    try {
      const response = await api.patch(`/users/${userId}`, { password: data.password });
      toast.success(response?.data?.message);
      if (response.status === 200) {
        setSession({...session, password: data.password})
        onClose();
        reset({ password: '' });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.ERROR);
    }
  };

  return (
    <form onSubmit={handleSubmit(handlePasswordSubmit)}>
      <label className="block text-sm text-gray-700">Password</label>
      <div className="flex items-center gap-2">
        <div className="w-full relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <EyeOpenIcon /> : <EyeNoneIcon />}
          </button>
        </div>
        <Button type="submit">
          Update
        </Button>
        <Button size="icon" className='icon rounded-full' variant="outline" type="button" onClick={onClose}>
          <XIcon className='icon-link' />
        </Button>
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
      )}
    </form>
  );
};

export default PasswordForm;
