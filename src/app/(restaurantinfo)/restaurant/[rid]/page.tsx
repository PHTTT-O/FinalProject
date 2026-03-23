import CreateBooking from "@/components/CreateBooking";
import { getRestaurant } from "@/libs/apiActions";
import Image from "next/image";

export default async function RestaurantDetailPage({ params }: { params: Promise<{ rid: string }> }) {
  const { rid } = await params;
  const response = await getRestaurant(rid);

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20 font-sans">
      {/* ── 1. Hero Image Section ── */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image 
          src={"/res.jpg"} 
          alt={response.name} 
          fill 
          priority
          className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
        />
        {/* Overlay ไล่เฉดให้ตัวหนังสืออ่านง่าย */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfc] via-transparent to-black/20"></div>
      </div>

      {/* ── 2. Content Container ── */}
      <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* ── Left Side: Restaurant Information ── */}
          <div className="w-full lg:w-2/3 bg-white p-10 md:p-14 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-50">
            <span className="text-amber-600 font-bold tracking-[0.3em] text-[10px] uppercase block mb-4">
              Featured Restaurant
            </span>
            
            <h1 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6 leading-tight">
              {response.name}
            </h1>
            
            <div className="w-20 h-1 bg-amber-500 mb-10"></div>

            {/* ข้อมูลร้านแบบเป็น Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                <p className="text-lg font-light italic">{response.address}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operating Hours</p>
                <p className="text-lg font-medium text-slate-800">
                   {response.open_time} <span className="text-amber-500 mx-2">—</span> {response.close_time}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact Number</p>
                <p className="text-lg font-medium text-slate-800 underline decoration-slate-100 underline-offset-8">
                  {response.phone}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-tighter">
                   ● Open Now
                </span>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-slate-50">
                <p className="text-slate-500 leading-relaxed font-light italic">
                  สัมผัสประสบการณ์รสชาติที่รังสรรค์อย่างประณีต พร้อมบรรยากาศสุดพิเศษที่รอให้คุณมาพิสูจน์ด้วยตัวเอง
                </p>
            </div>
          </div>

          {/* ── Right Side: Booking Section ── */}
          <div className="w-full lg:w-1/3 sticky top-28">
            <div className="bg-white text-black p-8 md:p-10 rounded-[40px] shadow-2xl shadow-slate-900/20 relative overflow-hidden">
              {/* ตกแต่งการ์ดจอง */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
              
              <h3 className="text-2xl font-serif mb-2">Reserve a Table</h3>
              <p className="text-slate-400 text-sm font-light mb-8">สัมผัสสุนทรียภาพแห่งมื้ออาหารวันนี้</p>
              
              <div className="space-y-6">
                {/* Component CreateBooking ของนาย 
                  แนะนำ: เข้าไปแก้ CSS ในนั้นให้เป็นสี Amber/Slate ด้วยจะหล่อมาก! 
                */}
                <CreateBooking rid={rid} restaurantName={response.name} />
              </div>

              <p className="mt-6 text-[10px] text-center text-slate-500 uppercase tracking-widest">
                No booking fee required
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}