import React from "react";

import Logout from "./Logout";
import { auth } from "@/utils/auth";
import Logo from "../LandingPage/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-10">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex flex-row items-center gap-4">
        <Link className="hover:text-primary mr-4" href="/explore">
          Explore Assets
        </Link>
        {session ? (
          <>
            <Button variant="outline" asChild>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
            <Avatar>
              <AvatarImage src={session.user.image ?? ""} />
              <AvatarFallback>
                {session.user.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Logout />
          </>
        ) : (
          <Button asChild>
            <Link href={"/auth"}>Log In</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
