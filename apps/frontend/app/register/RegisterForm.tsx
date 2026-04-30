"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post("https://cs-sbd-modul10-backend.vercel.app/user/register", { name, username, email, phone, password });

      // If success, go to login
      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Error registering user");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased flex flex-col selection:bg-[#0071E3] selection:text-white">
      {/* Header / Global Nav Style */}
      <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#d2d2d7]">
        <div className="max-w-[1000px] mx-auto px-6 h-12 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="text-xl font-bold tracking-tight cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Netlab Store</div>
          </div>

          <button onClick={() => router.push("/")} className="text-[12px] font-normal text-[#0066CC] hover:underline flex items-center gap-1 group">
            <i className="fas fa-arrow-left transition-transform group-hover:-translate-x-0.5"></i>
            Back
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center px-5 py-12 md:py-20">
        <div className="w-full max-w-[460px] animate-in fade-in duration-700">
          {error && <div className="mb-4 p-4 text-sm font-medium text-red-600 bg-red-50 rounded-xl text-center border border-red-100">{error}</div>}

          {/* Card Style: Apple ID / iCloud inspired */}
          <div className="bg-white rounded-[24px] md:rounded-[28px] p-8 md:p-14 shadow-[0_2px_40px_rgba(0,0,0,0.04)] border border-[#d2d2d7]/30">
            <div className="text-center mb-10 md:mb-12">
              <h1 className="text-[28px] md:text-[32px] font-semibold tracking-tight mb-2 md:mb-3 leading-tight">Buat Akun Anda</h1>
              <p className="text-[#6e6e73] text-[15px] md:text-[17px] leading-snug">Satu akun untuk semua kebutuhan komputer Anda.</p>
            </div>

            {/* Form Fields */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative group">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nama Lengkap" className="w-full bg-white border border-[#d2d2d7] rounded-xl px-4 py-3.5 outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all text-[17px] placeholder:text-[#86868b]" />
              </div>

              <div className="relative group">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username" className="w-full bg-white border border-[#d2d2d7] rounded-xl px-4 py-3.5 outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all text-[17px] placeholder:text-[#86868b]" />
              </div>

              <div className="relative group">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="w-full bg-white border border-[#d2d2d7] rounded-xl px-4 py-3.5 outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all text-[17px] placeholder:text-[#86868b]" />
              </div>

              <div className="relative group">
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="No. Telepon" className="w-full bg-white border border-[#d2d2d7] rounded-xl px-4 py-3.5 outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all text-[17px] placeholder:text-[#86868b]" />
              </div>

              <div className="relative group">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Kata Sandi" className="w-full bg-white border border-[#d2d2d7] rounded-xl px-4 py-3.5 outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] transition-all text-[17px] placeholder:text-[#86868b]" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1D1D1F]">
                  <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                </button>
              </div>

              <div className="pt-6 flex flex-col items-center gap-4">
                <button type="submit" className="w-full bg-[#0071E3] hover:bg-[#0077ED] text-white py-3.5 rounded-full font-medium text-[17px] transition-all active:scale-[0.98] shadow-sm flex items-center justify-center gap-1">
                  Lanjutkan
                  <i className="fas fa-chevron-right ml-1 text-sm"></i>
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#d2d2d7]"></div>
              </div>
              <div className="relative flex justify-center text-[12px] font-medium">
                <span className="bg-white px-4 text-[#86868b]">Atau</span>
              </div>
            </div>

            {/* GitHub Login - Developer Focus */}
            <button className="w-full flex items-center justify-center gap-3 bg-[#f5f5f7] hover:bg-[#e8e8ed] py-3 rounded-xl transition-colors font-medium border border-[#d2d2d7]/50">
              <i className="fab fa-github text-xl"></i>
              <span className="text-[15px]">Lanjutkan dengan GitHub</span>
            </button>
          </div>

          {/* Switch Mode */}
          <div className="mt-10 text-center">
            <p className="text-[14px] text-[#6e6e73]">
              Sudah memiliki akun?
              <Link href="/login" className="ml-1.5 text-[#0066CC] hover:underline font-semibold">
                Masuk sekarang.
              </Link>
            </p>
          </div>
        </div>
      </main>

      <div className="max-w-7xl mx-auto px-6 text-center text-[11px] text-gray-400 font-medium py-10 border-t border-gray-200">Copyright © 2026. Design terinspirasi dari Apple Inc, pengembangan design original.</div>
    </div>
  );
}
