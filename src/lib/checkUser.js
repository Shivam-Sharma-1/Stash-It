"use server";

import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export const checkUser = async () => {
  const session = await auth();
  if (!session) {
    console.log("Unauthorized access");
    return redirect("/auth");
  }

  return session;
};
