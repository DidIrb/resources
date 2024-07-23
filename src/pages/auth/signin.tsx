import { LoadingButton } from '@/components/custom/loading.btn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SigninFormData } from '@/types/forms.types';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth.context';

export function Signin() {
  const navigate = useNavigate();
  const { handleSubmit, control, formState: { errors } } = useForm<SigninFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { signin } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (val: SigninFormData) => {
    setIsLoading(true);
    try {
      const response = await signin(val);
      console.log(response.data);
      toast.success("Successfully logged in");
      navigate("/dashboard")
    } catch (error) {
      console.error(error);
      toast.error("Wrong Username and password combination");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Signin</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Controller
                name="username"
                control={control}
                rules={{ required: 'username is required' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="username"
                    type="text"
                    placeholder="m@example.com"
                  />
                )}
              />
              {errors.username && <p className="text-red-500 text-sm md:text-xs">{errors.username.message}</p>}
            </div>
            <div className="grid gap-2">
              <div className='relative'>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Password cannot exceed 50 characters',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password"
                      placeholder="complex password"
                      type={showPassword ? 'text' : 'password'}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeNoneIcon />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <LoadingButton loading={isLoading} type="submit" className="w-full">
              Login
            </LoadingButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
