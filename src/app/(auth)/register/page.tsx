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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterFormSchema, registerFormShema } from "../forms/register";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { register } from "@/app/actions/auth";
import LoginGoogle from "../login-google";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<RegisterFormSchema>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerFormShema),
  });

  const handleRegisterSubmit = async (values: RegisterFormSchema) => {
    setIsLoading(true);
    const registerData = {
      full_name: values.full_name,
      email: values.email,
      password: values.password,
    };

    const result = await register(registerData);

    if (result?.status === true) {
      toast.success(result.message);
      router.push("/login");
    } else {
      toast.error(result?.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleRegisterSubmit)}
        >
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Masukkan nama lengkap anda"
                  />
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
            {isLoading ? "Loading..." : "Daftar"}
          </Button>
        </form>
      </Form>
      <div className="flex flex-col gap-6 items-center">
        <div className="-my-3">
          <p className="text-sm ">Atau</p>
        </div>
        <LoginGoogle type="register" />
      </div>
      <div className="mt-4 text-center text-sm">
        Sudah punya akun?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Masuk
        </Link>
      </div>
    </>
  );
};

export default RegisterPage;
