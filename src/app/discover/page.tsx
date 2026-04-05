"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Waves from "@/components/Waves";

// Dynamically import the map to avoid SSR window errors
const DiscoveryMap = dynamic(() => import("@/components/DiscoveryMap"), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-neutral-100 animate-pulse rounded-2xl flex items-center justify-center font-semibold text-neutral-500 shadow-inner">Loading OpenStreetMap...</div>
});

const MOCK_PRODUCTS = [
  { id: "1", name: "Authentic Mysore Pak", category: "Food", seller: "Guru Sweets", price: 650, lat: 12.3052, lng: 76.6552 },
  { id: "2", name: "Pure Mysore Silk Sari", category: "Textiles", seller: "KSIC Weavers", price: 8500, lat: 12.2980, lng: 76.6400 },
  { id: "3", name: "Sandalwood Carving", category: "Handicrafts", seller: "Cauvery Emporium", price: 2100, lat: 12.3100, lng: 76.6450 },
  { id: "4", name: "Kanchipuram Silk Saree", category: "Textiles", seller: "Pachaiyappa's", price: 15400, lat: 12.8185, lng: 79.6947 },
  { id: "5", name: "Kashmiri Black Pepper", category: "Spices", seller: "Srinagar Farms", price: 1200, lat: 34.0837, lng: 74.7973 },
  { id: "6", name: "Jaipur Blue Pottery", category: "Handicrafts", seller: "Rajasthan Arts", price: 3400, lat: 26.9124, lng: 75.7873 },
  { id: "7", name: "Assam Pashmina Shawl", category: "Textiles", seller: "Himalayan Weaves", price: 12500, lat: 34.1, lng: 74.8 },
  { id: "8", name: "Kerala Ghost Pepper", category: "Spices", seller: "Munnar Spices", price: 800, lat: 10.0892, lng: 77.0595 },
  // Adding more diverse datasets across India
  { id: "9", name: "Darjeeling Golden Tea", category: "Food", seller: "Makaibari Estate", price: 2500, lat: 27.0360, lng: 88.2627 },
  { id: "10", name: "Lucknowi Chikankari Kurta", category: "Textiles", seller: "Awadh Weavers", price: 4200, lat: 26.8467, lng: 80.9462 },
  { id: "11", name: "Goan Cashew Feni", category: "Food", seller: "Cazulo Distillery", price: 1800, lat: 15.2993, lng: 74.1240 },
  { id: "12", name: "Varanasi Zari Zardosi", category: "Textiles", seller: "Banaras Looms", price: 11000, lat: 25.3176, lng: 82.9739 },
  { id: "13", name: "Kondapalli Wooden Toys", category: "Handicrafts", seller: "Andhra Artisans", price: 1500, lat: 16.6346, lng: 80.5367 },
  { id: "14", name: "Guntur Sannam Chilli", category: "Spices", seller: "Deccan Spices", price: 400, lat: 16.3067, lng: 80.4365 },
  { id: "15", name: "Patan Patola Saree", category: "Textiles", seller: "Gujarat Heritage", price: 45000, lat: 23.8493, lng: 72.1158 },
  { id: "16", name: "Madurai Sungudi Saree", category: "Textiles", seller: "Meenakshi Looms", price: 3200, lat: 9.9252, lng: 78.1198 },
  { id: "17", name: "Ooty Homemade Chocolates", category: "Food", seller: "Nilgiri Bakers", price: 900, lat: 11.4100, lng: 76.6950 },
  { id: "18", name: "Kolkata Terracotta Art", category: "Handicrafts", seller: "Bengal Clay", price: 2800, lat: 22.5726, lng: 88.3639 },
  { id: "19", name: "Coorg Eucalyptus Honey", category: "Food", seller: "Western Ghats Apiary", price: 750, lat: 12.3375, lng: 75.8069 },
  { id: "20", name: "Agra Ittar (Perfume)", category: "Handicrafts", seller: "Mughal Scents", price: 3500, lat: 27.1767, lng: 78.0081 }
];

const CATEGORIES = ["All", "Food", "Textiles", "Handicrafts", "Spices"];

export default function DiscoverPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mapCenter, setMapCenter] = useState<[number, number]>([12.2958, 76.6394]); // default Mysuru
  const [searchRegion, setSearchRegion] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    // Phase 1: Category Filter
    if (activeCategory !== "All" && p.category !== activeCategory) return false;
    
    // Phase 2: Region/State distance filter (rough approximation for demo)
    if (searchRegion) {
      const q = searchRegion;
      if (q.includes("kanchi") || q.includes("tamil") || q.includes("chennai") || q.includes("madurai")) {
        return Math.abs(p.lat - 12.8) < 4; 
      } else if (q.includes("mysur") || q.includes("karn") || q.includes("bengaluru") || q.includes("coorg")) {
        return Math.abs(p.lat - 12.2) < 4; 
      } else if (q.includes("kashm") || q.includes("srinagar")) {
        return Math.abs(p.lat - 34.0) < 4; 
      } else if (q.includes("jaipur") || q.includes("rajas") || q.includes("pink")) {
        return Math.abs(p.lat - 26.9) < 5; 
      } else if (q.includes("kerala") || q.includes("munnar") || q.includes("kochi")) {
        return Math.abs(p.lat - 10.0) < 4; 
      } else if (q.includes("lucknow") || q.includes("up") || q.includes("varanasi") || q.includes("agra")) {
        return Math.abs(p.lat - 26.8) < 5; 
      } else if (q.includes("darjeeling") || q.includes("kolkata") || q.includes("bengal")) {
        return Math.abs(p.lat - 22.5) < 7; 
      } else if (q.includes("goa")) {
        return Math.abs(p.lat - 15.2) < 3; 
      } else if (q.includes("andhra") || q.includes("guntur") || q.includes("kondapalli")) {
        return Math.abs(p.lat - 16.5) < 5; 
      } else if (q.includes("gujarat") || q.includes("patan") || q.includes("ahmedabad")) {
        return Math.abs(p.lat - 23.2) < 5; 
      } else {
        // If they search a specific product globally instead of a region
        return p.name.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q);
      }
    }
    return true; // no search query, show all that matched category
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setSearchRegion(val);
    
    if (val.includes("kanchi") || val.includes("tamil") || val.includes("chennai") || val.includes("madurai")) {
      setMapCenter([12.8185, 79.6947]); // Approx TN center
    } else if (val.includes("mysur") || val.includes("karn") || val.includes("coorg") || val.includes("bengaluru")) {
      setMapCenter([12.2958, 76.6394]); // Approx Karnataka
    } else if (val.includes("kashm") || val.includes("srinagar")) {
      setMapCenter([34.0837, 74.7973]); // Kashmir
    } else if (val.includes("jaipur") || val.includes("rajas") || val.includes("pink")) {
      setMapCenter([26.9124, 75.7873]); // Rajasthan
    } else if (val.includes("kerala") || val.includes("munnar") || val.includes("kochi")) {
      setMapCenter([10.0892, 77.0595]); // Kerala
    } else if (val.includes("lucknow") || val.includes("up") || val.includes("varanasi") || val.includes("agra")) {
      setMapCenter([26.8467, 80.9462]); // Uttar Pradesh
    } else if (val.includes("darjeeling") || val.includes("kolkata") || val.includes("bengal")) {
      setMapCenter([22.5726, 88.3639]); // West Bengal
    } else if (val.includes("goa")) {
      setMapCenter([15.2993, 74.1240]); // Goa
    } else if (val.includes("andhra") || val.includes("guntur") || val.includes("kondapalli")) {
      setMapCenter([16.5062, 80.6480]); // Andhra Pradesh
    } else if (val.includes("gujarat") || val.includes("patan") || val.includes("ahmedabad")) {
      setMapCenter([23.2156, 72.6369]); // Gujarat
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Background Animated Waves */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <Waves
          lineColor="#d7b2b2"
          backgroundColor="rgba(255, 255, 255, 0.2)"
          waveSpeedX={0.0125}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      <header className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-neutral-100 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-neutral-900">Local Treasures</Link>
          <div className="flex gap-4 items-center">
             <span className="text-sm font-medium hover:text-emerald-700 cursor-pointer text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg">Cart (0)</span>
             <div className="h-8 w-8 bg-neutral-200 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Discover Exclusive Crafts </h1>
          <p className="text-neutral-600">The map filters dynamically to show renowned local specialties within a specific region.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
            <div className="flex gap-2 items-center w-full sm:w-auto">
              <span className="text-sm font-medium text-neutral-500">Category:</span>
              <select 
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="w-full sm:w-96">
              <input 
                onChange={handleSearch}
                type="text" 
                placeholder="Search district (Type 'Kanchipuram' or 'Mysuru')..." 
                className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm rounded-lg px-4 py-2.5 focus:ring-emerald-500 transition focus:border-emerald-500 outline-none placeholder:text-neutral-400"
              />
            </div>
          </div>
        </div>

        <DiscoveryMap products={filteredProducts} mapCenter={mapCenter} />
      </main>
    </div>
  );
}