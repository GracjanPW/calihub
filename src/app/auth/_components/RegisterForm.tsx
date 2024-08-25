"use client";
import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Divider from "@/components/common/Divider";
import { z } from "zod";
import { signupCredentialsSchema } from "@/schema/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialProviders from "./SocialProviders";
import signup from "@/actions/auth/register";
import FormError from "@/components/common/FormError";
import FormSuccess from "@/components/common/FormSuccess";

function LoginForm() {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof signupCredentialsSchema>>({
    resolver: zodResolver(signupCredentialsSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onValid(data: z.infer<typeof signupCredentialsSchema>) {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      signup(data).then((res) => {
        setSuccess(res?.success);
        setError(res?.error);
      });
    });
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="john" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError text={error} />
        <FormSuccess text={success} />
        <Button
          disabled={pending}
          variant={"secondary"}
          type="submit"
          className="w-full font-semibold"
        >
          Register
        </Button>
      </form>
      <Divider text="OR" />
      <SocialProviders />
    </Form>
  );
}

export default LoginForm;
