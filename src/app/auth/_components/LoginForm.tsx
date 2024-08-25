"use client";
import { useState, useTransition } from "react";
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
import { loginCredentialsSchema } from "@/schema/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialProviders from "./SocialProviders";
import login from "@/actions/auth/login";
import FormError from "@/components/common/FormError";
import FormSuccess from "@/components/common/FormSuccess";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

function LoginForm() {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [twoFactor, setTwoFactor] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginCredentialsSchema>>({
    resolver: zodResolver(loginCredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
      code: undefined,
    },
  });

  function onValid(data: z.infer<typeof loginCredentialsSchema>) {
    setError(undefined);
    setSuccess(undefined);
    startTransition(() => {
      login(data)
        .then((res) => {
          if (res?.error) {
            if (res.error === "Invalid credentials") {
              form.reset({
                email: data.email,
                password: undefined,
                code: undefined,
              });
              setTwoFactor(false);
            }
            setError(res.error);
          }
          if (res?.success) {
            setSuccess(res.success);
          }
          if (res?.twoFactor) setTwoFactor(true);
        })
        .catch((e) => setError("Something went wrong"));
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
        {twoFactor && (
          <>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-center items-center">
                  <FormLabel className="text-lg">Enter 2FA token</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field} autoComplete="off">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {!twoFactor && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      type="email"
                      {...field}
                    />
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
                    <Input placeholder="******" type={"password"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link className="ml-2 mt-1 text-xs" href="/auth/reset-password">
              Forgot passowrd?
            </Link>
          </>
        )}
        <FormError text={error} />
        <FormSuccess text={success} />
        <Button
          disabled={pending}
          variant={"secondary"}
          type="submit"
          className="w-full font-semibold"
        >
          Login
        </Button>
      </form>
      <Divider text="OR" />
      <SocialProviders />
    </Form>
  );
}

export default LoginForm;
