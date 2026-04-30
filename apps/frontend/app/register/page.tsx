import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";

export default async function Register() {
  const cookieStore = await cookies();
  const sessionKey = cookieStore.get("session_key");
  const userDetailStr = cookieStore.get("user_detail");

  let shouldRedirect = false;

  if (sessionKey && userDetailStr) {
    try {
      const userDetail = JSON.parse(userDetailStr.value);
      if (userDetail.email) {
        const response = await axios.get(`http://localhost:3100/user/${userDetail.email}`, {
          headers: {
            Authorization: `Bearer ${sessionKey.value}`,
          },
        });
        if (response.status === 200) {
          shouldRedirect = true;
        }
      }
    } catch (err) {
      // Abaikan jika token tidak valid
    }
  }

  if (shouldRedirect) {
    redirect("/barang");
  }

  return <RegisterForm />;
}
