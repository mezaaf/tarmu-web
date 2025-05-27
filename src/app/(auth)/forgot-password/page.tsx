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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  forgotPasswordFormSchema,
  ForgotPasswordFormSchema,
} from "../forms/forgot-password";
import { forgotPassword } from "@/utils/supabase/service";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<ForgotPasswordFormSchema>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordFormSchema),
  });

  const handleResetPasswordSubmit = async (
    values: ForgotPasswordFormSchema
  ) => {
    setIsLoading(true);
    const forgotPasswordData = {
      email: values.email,
    };

    const result = await forgotPassword(forgotPasswordData);

    if (result?.status === true) {
      toast.success("Link reset password telah dikirim ke email anda.");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(result?.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleResetPasswordSubmit)}
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

          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? "Loading..." : "Kirim"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ForgotPasswordPage;
