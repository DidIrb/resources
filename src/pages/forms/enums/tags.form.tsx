import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';

const formSchema = z.object({
  value: z.string().min(1, { message: "Value is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface InputFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
    }
  });

  const handleFormSubmit = async (data: FormSchema) => {
    try {
      const response = await api.post('/your-endpoint', { value: data.value });
      toast.success(response?.data?.message);
      if (response.status === 200) {
        onSuccess();
        reset({ value: '' });
        onClose();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.ERROR);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label className="block text-sm text-gray-700">Value</label>
      <div className="flex items-center gap-2">
        <div className="w-full relative">
          <Input
            type="text"
            {...register('value')}
          />
        </div>
        <Button type="submit">
          Submit
        </Button>
        <Button size="icon" className='icon rounded-full' variant="outline" type="button" onClick={onClose}>
          <XIcon className='icon-link' />
        </Button>
      </div>
      {errors.value && (
        <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>
      )}
    </form>
  );
};

export default InputForm;
