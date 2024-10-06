"use client";

import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const AuthPage = () => {
  return (
    <main>
      <div>
        <h1>Sign Up</h1>
        <Button onClick={() => signIn("google")}>Sign In with Google</Button>
        <Button onClick={() => signIn("github")}>Sign In with GitHub</Button>
      </div>
    </main>
  );
};

export default AuthPage;
