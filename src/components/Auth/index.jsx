"use client";

import React from "react";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session && session.user.email) {
    console.log("Unauthorized access");
    router.push("/dashboard");
  }

  return (
    <main>
      <div>
        <h1>Sign Up</h1>
        <Button onClick={() => signIn("google", { redirectTo: "/dashboard" })}>
          Sign In with Google
        </Button>
        <Button onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
          Sign In with GitHub
        </Button>
      </div>
    </main>
  );
};

export default AuthPage;
