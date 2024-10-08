import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  value: z.string().min(1, { message: "Value is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

interface InputFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const TypesForm: React.FC<InputFormProps> = ({ onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: '',
    }
  });

  const handleFormSubmit = async (data: FormSchema) => {
    try {
      const response = await api.post('/enum/types', data);
      toast.success(response?.data?.message);
      if (response.status === 201) {
        onSuccess();
        reset({ value: '' });
        onClose();
      }
    } catch (error: any) {
      const message = error.response.data.error || "Internal Server Error";
      toast.error(message);
    }
  };

  return (
    <Card className='border mt-2 p-2 md:w-[50%] w-full'>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="text-sm text-gray-700 mb-1">Types</div>
        <div className="flex sm:flex-row flex-col items-center gap-2">
          <div className="w-full relative">
            <Input
              type="text"
              {...register('value')}
            />
          </div>
          <div className='flex gap-2 w-full'>
            <Button type="submit"> Submit </Button>
            <Button variant="secondary" type="button" onClick={onClose}> Close </Button>
          </div>
        </div>
        {errors.value && (
          <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>
        )}
      </form>
    </Card>
  );
};

export default TypesForm;
