import Link from "next/link";
import RestaurantCatalog from "@/components/restaurantCatalog";
import { getRestaurants } from "@/libs/apiActions";

export default async function Home() {
  let restaurants = [];
  try {
    restaurants = await getRestaurants();
  } catch (e) {
    restaurants = [];
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-800 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            RESERVE ME  <br />
            <span className="text-purple-300">จองร้านอาหารกับเรา</span>
          </h1>

          <p className="mt-5 text-lg text-purple-100/80 max-w-xl mx-auto">
            เลือกร้านที่ชอบ เลือกวันเวลา ยืนยันการจอง
          </p>

          <div className="mt-10">
            <Link
              href="/restaurant"
              className="bg-white text-purple-700 font-black text-lg px-10 py-4 rounded-2xl shadow-xl shadow-purple-900/30 hover:bg-purple-50 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              ดูร้านอาหารทั้งหมด
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[
              { value: "500+", label: "ร้านอาหาร" },
              { value: "10K+", label: "การจอง" },
              { value: "4.8★", label: "คะแนนเฉลี่ย" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-sm text-purple-300 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Restaurant Catalog ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">ร้านอาหารทั้งหมด</h2>
            <p className="text-sm text-gray-500 mt-1">
              {restaurants.length > 0
                ? `พบ ${restaurants.length} ร้าน`
                : "กำลังโหลดข้อมูล..."}
            </p>
          </div>
          <Link href="/restaurant" className="text-sm font-bold text-purple-600 hover:underline">
            ดูทั้งหมด →
          </Link>
        </div>

        {restaurants.length > 0 ? (
          <RestaurantCatalog RestaurantJson={restaurants} />
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="font-semibold">ไม่พบข้อมูลร้านอาหาร</p>
            <p className="text-sm mt-1">กรุณาตรวจสอบการเชื่อมต่อ Backend</p>
          </div>
        )}
      </section>

    </main>
  );
}