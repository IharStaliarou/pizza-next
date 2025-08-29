import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

import { TFormLoginValues, formLoginSchema } from './schemas';
import { Title, FormInput } from '@/components/shared';
import { Button } from '@/components/ui';

interface ILoginFormProps {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<ILoginFormProps> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success('You have successfully logged into your account.', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Failed to log into your account', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className='flex flex-col gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex justify-between items-center'>
          <div className='mr-2'>
            <Title
              text='Log into your account'
              size='md'
              className='font-bold'
            />
            <p className='text-gray-400'>
              Enter your email to log into your account
            </p>
          </div>
          <img
            src='/assets/images/numbers-icon.png'
            alt='phone-icon'
            width={60}
            height={60}
          />
        </div>

        <FormInput name='email' label='E-Mail' required />
        <FormInput name='password' label='Password' type='password' required />

        <Button
          loading={form.formState.isSubmitting}
          className='h-12 text-base'
          type='submit'
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
};
