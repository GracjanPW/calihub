"use client"
import newPassword from '@/actions/auth/new-password';
import FormError from '@/components/common/FormError';
import FormSuccess from '@/components/common/FormSuccess';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { newPasswordSchema } from '@/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useTransition } from 'react'
import { useSearchParams } from "next/navigation";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function NewPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [pending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof newPasswordSchema>>({
      resolver: zodResolver(newPasswordSchema),
      defaultValues: {
        password:"",
        confirmPassword:""
      },
    });
  
    function onValid(data: z.infer<typeof newPasswordSchema>) {
      setError(undefined);
      setSuccess(undefined);
      startTransition(() => {
        newPassword(data, token)
          .then((res) => {
            form.reset()
            setError(res?.error);
            setSuccess(res?.success);
          })
          .catch(() => {
            setError("Something went wrong");
          });
      });
    }
    function onError() {
      return;
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid, onError)}
        className="space-y-4">
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="confirm password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormSuccess text={success}/>
          <FormError text={error}/>
          <Button
            disabled={pending}
            variant={"secondary"}
            type="submit"
            className="w-full font-semibold"
          >
            Confirm
          </Button>
        </form>
      </Form>
    );
}

export default NewPasswordForm