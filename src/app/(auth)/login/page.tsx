"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginFormSchema, loginFormShema } from "../forms/login";
import LoginGoogle from "../login-google";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios/instance";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<LoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginFormShema),
  });

  const handleLoginSubmit = async (values: LoginFormSchema) => {
    setIsLoading(true);
    await axiosInstance
      .post("/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        const message = response.data.message;
        toast.success(message);
        setIsLoading(false);
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          const message = error.response.data.message;
          toast.error(message);
          setIsLoading(false);
        }
      });
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleLoginSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Masukkan email anda"
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
                <FormLabel>
                  <h1>Password</h1>

                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline font-normal"
                  >
                    Forgot your password?
                  </Link>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Masukkan password"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? "Loading..." : "Masuk"}
          </Button>
        </form>
      </Form>
      <div className="flex flex-col gap-6 items-center">
        <div className="-my-3">
          <p className="text-sm ">Atau</p>
        </div>
        <LoginGoogle type="login" />
      </div>
      <div className="mt-4 text-center text-sm">
        Belum punya akun?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Daftar
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
