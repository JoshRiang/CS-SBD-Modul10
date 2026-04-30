import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function Login() {
  const cookieStore = await cookies();
  const sessionKey = cookieStore.get("session_key");
  const userDetailStr = cookieStore.get("user_detail");

  // ketika masuk ke halaman login, kita cek apakah ada cookies atau tidak, jika ada dan valid, kita redirect ke halaman barang
  let shouldRedirect = false;

  if (sessionKey && userDetailStr) {
    try {
      const userDetail = JSON.parse(userDetailStr.value);
      if (userDetail.email) {
        const response = await axios.get(`https://cs-sbd-modul10-backend.vercel.app/user/${userDetail.email}`, {
          headers: {
            Authorization: `Bearer ${sessionKey.value}`,
          },
        });
        if (response.status === 200) {
          shouldRedirect = true;
        }
      }
    } catch (err) {
      // Jika token sudah tidak valid / tidak bisa get profile, biarkan render LoginForm (jangan terredirect)
    }
  }

  if (shouldRedirect) {
    redirect("/barang");
  }

  return <LoginForm />;
}
