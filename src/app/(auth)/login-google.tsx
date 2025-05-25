"use client";

import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { loginWithGoogle } from "../actions/auth";
import { FcGoogle } from "react-icons/fc";

const LoginGoogle = (props: { type: "login" | "register" }) => {
  const [isPending, startTransition] = useTransition();

  const handleLoginGoogle = () => {
    startTransition(async () => {
      await loginWithGoogle();
    });
  };
  return (
    <>
      <Button
        disabled={isPending}
        onClick={handleLoginGoogle}
        variant="outline"
        className="w-full"
      >
        <FcGoogle />
        {isPending ? (
          "Mengalihkan..."
        ) : (
          <>
            {props.type === "login"
              ? "Masuk dengan Google"
              : "Daftar dengan Google"}
          </>
        )}
      </Button>
    </>
  );
};

export default LoginGoogle;
