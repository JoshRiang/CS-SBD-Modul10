"use server";

import { cookies } from "next/headers";

export async function setLoginSession(token: string, userDetailStr: string) {
  const cookieStore = await cookies();
  cookieStore.set("session_key", token, { secure: true });
  cookieStore.set("user_detail", userDetailStr);
}
