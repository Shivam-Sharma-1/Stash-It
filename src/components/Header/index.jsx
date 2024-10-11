import React from "react";

import Logout from "./Logout";
import { auth } from "@/utils/auth";

const Header = async () => {
  const session = await auth();

  return (
    <header className="w-full h-[80px] bg-gray-300 flex items-center justify-between px-10">
      <h1>StashIt</h1>
      <h2>Hello {session ? session.user.name : "No session"}</h2>
      <Logout />
    </header>
  );
};

export default Header;
