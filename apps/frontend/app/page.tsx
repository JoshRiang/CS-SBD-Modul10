"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const response = {
  page: 1,
  results: [
    {
      userId: 1,
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      image: "https://picsum.photos/500?random=1",
    },
    {
      userId: 1,
      id: 2,
      title: "qui est esse",
      body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
      image: "https://picsum.photos/500?random=2",
    },
    {
      userId: 1,
      id: 3,
      title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
      body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
      image: "https://picsum.photos/500?random=3",
    },
    {
      userId: 1,
      id: 4,
      title: "eum et est occaecati",
      body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
      image: "https://picsum.photos/500?random=4",
    },
    {
      userId: 1,
      id: 5,
      title: "nesciunt quas odio",
      body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
      image: "https://picsum.photos/500?random=5",
    },
  ],
};

export default function Home() {
  const [count, setCount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (count !== 0 && count % 10 === 0) {
      alert(`kelipatan 10`);
    }
  }, [count]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-10">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
        <h1 className="text-xl font-bold">Joshua Richardo Riangkamang</h1>
        <ul className="flex space-x-6">
          <li>
            <button onClick={() => router.push("/login")} className="hover:underline">
              Login
            </button>
          </li>
          <li>
            <button onClick={() => router.push("/register")} className="hover:underline">
              Register
            </button>
          </li>
          <li>
            <button onClick={() => router.push("/barang")} className="hover:underline">
              Barang
            </button>
          </li>
        </ul>
      </nav>

      <main className="max-w-6xl mx-auto px-4 mt-8">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {response.results.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-xl transition">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Counter */}
        <section className="mt-12 bg-white rounded-xl shadow-md p-8 text-center border border-gray-100 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6">Counter</h2>
          <div className="text-5xl font-extrabold text-blue-600 mb-8">{count}</div>
          <div className="flex justify-center space-x-4">
            <button onClick={() => setCount((c) => c - 1)} className="px-6 py-2 bg-red-500 text-white rounded-md font-semibold">
              - Kurang
            </button>
            <button onClick={() => setCount(0)} className="px-6 py-2 bg-gray-500 text-white rounded-md font-semibold">
              Reset
            </button>
            <button onClick={() => setCount((c) => c + 1)} className="px-6 py-2 bg-green-500 text-white rounded-md font-semibold">
              + Tambah
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">Angka kelipatan 10 akan memunculkan Alert</p>
        </section>
      </main>
    </div>
  );
}
