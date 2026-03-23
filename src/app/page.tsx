import Link from "next/link";
import Image from "next/image";
import RestaurantCatalog from "@/components/restaurantCatalog";
import { getRestaurants } from "@/libs/apiActions";
import { RestaurantItem } from "../interface";

export default async function Home() {
  // นำเอา timeout ออกหรือปรับลดลงตามความเหมาะสม
  let restaurants: RestaurantItem[] = [];
  try {
    restaurants = await getRestaurants();
  } catch (e) { 
    console.error("Fetch error:", e);
    restaurants = [];
  }

  return (
    <main className="min-h-screen bg-[#fcfcfc]">

      {/* ── 🌟 Hero Banner: Luxury Edition 🌟 ── */}
      <section className="relative bg-slate-950 text-white min-h-[85vh] flex items-center justify-center overflow-hidden">
        
        {/* Background Image: เน้นรูปที่โทนสีมืดๆ นิ่งๆ */}
        <Image 
          src="/res.jpg" 
          alt="Luxury Restaurant"
          fill
          priority 
          className="object-cover object-center opacity-40 scale-105" // ขยายเล็กน้อยให้ดูมีมิติ
        />

        {/* Overlay: ใช้ Gradient สีเข้มแบบไล่จากดำไปน้ำเงินลึก */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>

        <div className="relative max-w-6xl mx-auto px-6 z-10 w-full">
          <div className="max-w-3xl">
            <span className="inline-block border-l-2 border-amber-500 pl-4 text-amber-500 text-sm font-bold tracking-[0.2em] uppercase mb-6">
              Exclusive Dining Experience
            </span>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif tracking-tight leading-[1.1]">
              RESERVE<span className="text-amber-500">ME</span>
            </h1>
            
   

            <div className="mt-12 flex flex-col sm:flex-row gap-5">
              <Link
                href="/restaurant"
                className="bg-amber-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-2xl shadow-amber-900/20 hover:bg-amber-500 hover:-translate-y-1 transition-all duration-300"
              >
                Explore Restaurants
              </Link>
              
              <Link
                href="/register"
                className="bg-white/5 backdrop-blur-md text-white font-medium text-lg px-10 py-4 rounded-full border border-white/10 hover:bg-white/20 transition-all"
              >
                Join Membership
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Restaurant Catalog: Clean & Elegant ── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="relative">
            <div className="absolute -top-8 left-0 text-[100px] font-black text-slate-100 -z-10 select-none">
              FINEST
            </div>
            <h2 className="text-4xl font-serif text-slate-900">ร้านอาหารแนะนำ</h2>
            <div className="w-20 h-1 bg-amber-500 mt-4"></div>
          </div>
          
          <Link href="/restaurant" className="group text-slate-500 font-medium flex items-center gap-2 hover:text-amber-600 transition-colors">
            VIEW ALL COLLECTIONS 
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>

        {restaurants.length > 0 ? (
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
             <RestaurantCatalog RestaurantJson={restaurants} />
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-50 rounded-[40px] border border-slate-200">
            <div className="inline-block p-6 bg-white rounded-full shadow-inner mb-6">
               <span className="text-4xl">✨</span>
            </div>
            <p className="text-xl font-serif text-slate-800 italic">Finding the perfect spots for you...</p>
          </div>
        )}
      </section>

    </main>
  );
}