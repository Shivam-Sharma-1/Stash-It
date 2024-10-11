"use server";

import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { BASE_URL } from "./constants";

export const checkUser = async () => {
  const session = await auth();
  if (!session) {
    console.log("Unauthorized access");
    return redirect(`${BASE_URL}/auth`);
  }

  return session;
};
