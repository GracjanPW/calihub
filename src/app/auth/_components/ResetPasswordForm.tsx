"use client";
import sendPasswordReset from "@/actions/auth/password-reset";
import FormError from "@/components/common/FormError";
import FormSuccess from "@/components/common/FormSuccess";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailResetPasswordSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

function ResetPasswordForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof emailResetPasswordSchema>>({
    resolver: zodResolver(emailResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onValid(data: z.infer<typeof emailResetPasswordSchema>) {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      sendPasswordReset(data)
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
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email@gmail.com" type="email" {...field} />
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
          Send reset email
        </Button>
      </form>
    </Form>
  );
}

export default ResetPasswordForm;
