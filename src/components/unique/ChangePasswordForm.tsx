"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { changePasswordSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormSuccess from "../common/FormSuccess";
import FormError from "../common/FormError";
import { startTransition, useState, useTransition } from "react";
import changePassword from "@/actions/auth/change-password";

function ChangePasswordForm() {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [pending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });
  function onValid(data: z.infer<typeof changePasswordSchema>) {
    setError(undefined)
    setSuccess(undefined)
    startTransition(()=>{
        changePassword(data).then(res=>{
            form.reset()
            setError(res?.error)
            setSuccess(res?.success)
        })
    })
  }
  function onError() {
    return;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid, onError)}
        className="space-y-4"
      >
        <h2 className="text-xl">Change password</h2>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSuccess text={success} />
        <FormError text={error}/>
        <Button disabled={pending} type="submit">Change password</Button>
      </form>
    </Form>
  );
}

export default ChangePasswordForm;
