import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

// Tipe data berdasarkan model Item di backend
type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

export default async function BarangDashboard() {
  const cookieStore = await cookies();
  const sessionKey = cookieStore.get("session_key");
  const userDetailStr = cookieStore.get("user_detail");

  // Proteksi
  if (!sessionKey || !userDetailStr) {
    redirect("/login");
  }

  let userDetail;
  try {
    const decodedUserString = decodeURIComponent(userDetailStr.value);
    userDetail = JSON.parse(decodedUserString);

    if (!userDetail.email) {
      console.error("DEBUG: userDetail tidak memiliki properti email!", userDetail);
      // redirect("/login"); 
    }

    const response = await axios.get(`https://cs-sbd-modul10-backend.vercel.app/user/${userDetail.email}`, {
      headers: { Authorization: `Bearer ${sessionKey.value}` },
    });

    if (response.status !== 200) {
      console.error("DEBUG: Status response bukan 200, melainkan", response.status);
      redirect("/login");
    }
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.error("DEBUG AXIOS ERROR:", err.response?.status, err.response?.data);
    } else {
      console.error("DEBUG PARSING ERROR:", err.message);
    }

    // redirect("/login");
  }

  // Mengambil data barang
  let items: Item[] = [];
  try {
    const response = await axios.get("https://cs-sbd-modul10-backend.vercel.app/items");
    items = response.data.payload || []; // Menyesuaikan dengan format response yang umum dari backend kita
  } catch (err) {
    console.error("Gagal mengambil data barang", err);
  }

  const logoutAction = async () => {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("session_key");
    cookieStore.delete("user_detail");
    redirect("/login");
  };

  return <DashboardClient items={items} userDetail={userDetail} onLogout={logoutAction} />;
}
