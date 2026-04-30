"use client";

import React, { useState, useEffect, useTransition } from "react";

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
};

type Props = {
  items: Item[];
  userDetail: any;
  onLogout: () => Promise<void>;
};

export default function DashboardClient({ items, userDetail, onLogout }: Props) {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  // Efek scroll untuk navbar transparan (Glassmorphism)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = ["Semua", "Mouse", "Monitor", "Keyboard", "Headset"];

  // Fungsi pembantu untuk membuat variasi warna, ikon, dan kategori palsu pada item dari backend
  const getStyleForIndex = (index: number) => {
    const styles = [
      { icon: <i className="fas fa-laptop text-3xl text-blue-500" />, color: "bg-blue-50", category: "Semua" },
      { icon: <i className="fas fa-mouse text-3xl text-purple-500" />, color: "bg-purple-50", category: "Mouse" },
      { icon: <i className="fas fa-keyboard text-3xl text-orange-500" />, color: "bg-orange-50", category: "Keyboard" },
      { icon: <i className="fas fa-desktop text-3xl text-emerald-500" />, color: "bg-emerald-50", category: "Monitor" },
      { icon: <i className="fas fa-desktop text-3xl text-emerald-500" />, color: "bg-emerald-50", category: "Monitor" },
    ];
    return styles[index % styles.length];
  };

  const products = items.map((item, i) => {
    const style = getStyleForIndex(i);
    return {
      id: item.id,
      name: item.name,
      category: style.category,
      price: `Rp ${item.price.toLocaleString("id-ID")}`,
      stock: item.stock,
      icon: style.icon,
      desc: item.description,
      color: style.color,
    };
  });

  const filteredProducts = activeCategory === "Semua" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased selection:bg-blue-500 selection:text-white pb-20">
      {/* Navbar Apple Style */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm" : "bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-gray-200 md:border-transparent"} `}>
        <div className="max-w-7xl mx-auto px-5 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-lg md:text-xl font-bold tracking-tight cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Netlab Store</div>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#424245]">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`hover:text-black transition-colors ${activeCategory === cat ? "text-black font-semibold" : ""}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-5">
            <div className="hidden md:flex items-center gap-2 mr-2">
              <span className="text-sm text-gray-500 font-medium">Hello, {userDetail.name?.split(" ")[0] || userDetail.username || "User"}</span>
            </div>

            <div className="relative cursor-pointer group">
              <i className="fas fa-shopping-bag text-[#424245] group-hover:text-black mt-1 text-base md:text-lg transition-colors"></i>
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[9px] md:text-[10px] w-3.5 h-3.5 md:w-4 md:h-4 flex items-center justify-center rounded-full shadow-sm">{cartCount}</span>}
            </div>

            <div className="h-4 md:h-5 w-[1px] bg-gray-300 mx-0.5 md:mx-1"></div>

            <button onClick={() => startTransition(() => onLogout())} disabled={isPending} className="text-[#424245] hover:text-red-500 transition-colors flex items-center" title="Logout">
              <i className="fas fa-sign-out-alt text-base md:text-lg"></i>
            </button>
          </div>
        </div>

        <div className="md:hidden w-full overflow-x-auto no-scrollbar border-t border-gray-100 bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-6 px-5 py-2.5 text-[13px] font-medium text-[#424245] min-w-max">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`hover:text-black transition-colors ${activeCategory === cat ? "text-black font-semibold border-b-2 border-black pb-0.5" : ""}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="pt-32 md:pt-44 pb-16 md:pb-20 px-5 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 leading-tight">Josh once said</h1>
          <p className="text-[17px] md:text-xl text-[#86868B] max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">"Life is all gambling, take the risk and shoot for the stars, otherwise you will keep playing with the rocks below."</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-sm mx-auto sm:max-w-none">
            <button className="w-full sm:w-auto bg-[#0071E3] hover:bg-[#0077ED] text-white px-8 py-3.5 md:py-3 rounded-full font-medium transition-all transform hover:scale-[1.02] active:scale-95 shadow-md shadow-blue-500/10 text-[17px] md:text-base">Mulai Belanja</button>
            <button onClick={() => window.open("https://wa.me/6289681711289", "_blank")} className="w-full sm:w-auto text-[#0066CC] hover:bg-blue-50 sm:hover:bg-transparent px-8 py-3.5 sm:p-0 rounded-full sm:rounded-none flex justify-center items-center gap-1 font-medium group text-[17px] md:text-base transition-colors">
              Konsultasi Hidup <i className="fas fa-chevron-right text-[14px] md:text-[12px] ml-1 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 md:px-6 py-12 md:py-20">
        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.12)] group">
          <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1600" alt="Apple Style Workspace" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 md:from-black/30 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white pr-6">
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-90 mb-1.5 md:mb-1">Exclusive Stuff</p>
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-snug">Didesain sang perfeksionis.</h3>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-5 md:px-6 py-12 md:py-24">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Koleksi Terbaru</h2>
          <button className="text-[#0066CC] hover:underline text-[15px] md:text-base font-medium hidden sm:block">Lihat Semua</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-[#d2d2d7]/50 md:border-transparent md:hover:border-gray-100">
              <div className={`w-14 h-14 md:w-16 md:h-16 ${product.color} rounded-2xl flex items-center justify-center mb-6 md:mb-8 transform group-hover:scale-110 transition-transform duration-500`}>{product.icon}</div>

              <div className="flex justify-between items-center mb-2 md:mb-3">
                <div className="text-[10px] md:text-xs font-bold text-[#86868B] uppercase tracking-widest">{product.category}</div>
                <div className="text-[9px] md:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">{product.stock} Stok</div>
              </div>

              <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 tracking-tight">{product.name}</h3>
              <p className="text-[#86868B] text-[13px] md:text-sm leading-relaxed mb-6 md:mb-8 flex-grow line-clamp-3 md:line-clamp-none">{product.desc}</p>

              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-lg md:text-xl font-medium tracking-tight">{product.price}</span>
                <button onClick={() => setCartCount((c) => c + 1)} className="bg-[#F5F5F7] hover:bg-[#E8E8ED] w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-colors group/btn active:bg-[#d2d2d7]">
                  <i className="fas fa-plus text-sm group-active/btn:scale-90 transition-transform text-[#1D1D1F]"></i>
                </button>
              </div>

              <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                <i className="fas fa-external-link-alt text-xl text-gray-300"></i>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-16 md:py-20 bg-white rounded-[2rem] border border-[#d2d2d7]/30">
              <p className="text-[#86868B] font-medium text-sm md:text-base">Belum ada barang di kategori ini.</p>
            </div>
          )}
        </div>
        <button className="w-full mt-6 bg-white border border-[#d2d2d7] py-3.5 rounded-xl font-medium text-[#1D1D1F] sm:hidden hover:bg-gray-50 transition-colors">Lihat Semua Koleksi</button>
      </main>

      <section className="max-w-7xl mx-auto px-5 md:px-6 pb-16 md:pb-20">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 py-14 md:p-20 text-center relative overflow-hidden shadow-sm border border-[#d2d2d7]/50">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-5 tracking-tight leading-tight">Dapatkan kabar terbaru.</h2>
            <p className="text-[15px] md:text-base text-[#86868B] mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed px-4 md:px-0">Dapatkan informasi mengenai rilis produk dan berita teknik baru langsung ke email Anda.</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full max-w-md mx-auto">
              <input type="email" placeholder="Email Anda" className="w-full bg-[#F5F5F7] border border-transparent hover:border-[#d2d2d7]/50 rounded-xl md:rounded-2xl px-5 flex-1 py-3.5 md:py-4 outline-none focus:ring-1 focus:bg-white focus:border-[#0071E3] focus:ring-[#0071E3] transition-all text-[15px] md:text-base placeholder:text-[#86868b]" />
              <button className="w-full sm:w-auto bg-[#1D1D1F] text-white px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-medium hover:bg-black transition-colors text-[15px] md:text-base active:scale-[0.98]">Berlangganan</button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-blue-50 rounded-full blur-[80px] md:blur-[100px] -mr-24 -mt-24 md:-mr-32 md:-mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-purple-50 rounded-full blur-[80px] md:blur-[100px] -ml-24 -mb-24 md:-ml-32 md:-mb-32"></div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 text-center text-[10px] md:text-[11px] text-[#86868B] font-medium py-8 md:py-10 border-t border-[#d2d2d7]/50">Copyright © 2026. Design terinspirasi dari Apple Inc, pengembangan design original.</div>
    </div>
  );
}
