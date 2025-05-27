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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  resetPasswordFormSchema,
  ResetPasswordFormSchema,
} from "../forms/reset-password";
import { resetPassword } from "@/utils/supabase/service";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<ResetPasswordFormSchema>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const handleResetSubmit = async (values: ResetPasswordFormSchema) => {
    setIsLoading(true);
    const resetPasswordData = {
      password: values.password,
    };

    const result = await resetPassword(
      resetPasswordData,
      searchParams.get("code") as string
    );

    if (result?.status === true) {
      toast.success(result.message);
      router.push("/");
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
          onSubmit={form.handleSubmit(handleResetSubmit)}
        >
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
            {isLoading ? "Loading..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ResetPasswordPage;
