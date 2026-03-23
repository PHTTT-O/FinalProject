import RestaurantCatalog from "@/components/restaurantCatalog";
import { getRestaurants } from "@/libs/apiActions";

// สมมติว่านายสร้างไฟล์ loading.tsx ไว้ใน folder นี้แล้วนะ


export default async function RestaurantPage() {
    // ดึงข้อมูลร้านอาหารแบบ Server-side (ไวและดีต่อ SEO)
    const restaurantData = await getRestaurants();

    return (
        <main className="bg-[#fcfcfc] min-h-screen pb-24 font-sans">
            
            {/* =========================================
               🌟 SECTION 1: Luxury Hero Banner
               ========================================= */}
            <div className="relative bg-slate-950 pt-32 pb-48 px-6 overflow-hidden">
                {/* 1.1 Decorative Background Visuals */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40 pointer-events-none">
                    {/* แสง Glow สีทองและเทา */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px]"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-500/15 rounded-full blur-[120px]"></div>
                    
                    {/* (Optional) ถ้านายมีรูปพื้นหลังแนวอาหารเหงาๆ สวยๆ ให้เอามาใส่ตรงนี้ */}
                    {/* <Image 
                        src="/img/hero-pattern.jpg" 
                        alt="pattern" 
                        fill 
                        className="object-cover mix-blend-overlay opacity-30"
                    /> */}
                </div>

                {/* 1.2 Banner Content */}
                <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">

                    
                    {/* หัวข้อหลัก: ใช้ Font Serif สลับกับ Sans และ Italic เพื่อความหรู */}
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 tracking-tighter italic">
                        Our <span className="text-amber-500 not-italic">Restaurants</span>
                    </h1>
                    
  
                </div>
            </div>

            {/* =========================================
               🌟 SECTION 2: Main Content (Catalog)
               ========================================= */}
            {/* ใช้ -mt-16 เพื่อให้ Card สีขาวลอยทับ Banner สีดำเล็กน้อย เพิ่มมิติ */}
            <div className="max-w-7xl mx-auto px-6 -mt-20 md:-mt-16 relative z-20">
                <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100">
                    
                    {/* 2.1 ส่วนหัวของ Catalog */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 border-b border-slate-100 pb-10">
                        <div>
                            <h2 className="text-3xl font-serif text-slate-900 mb-2 italic">Exclusive Selection</h2>
                            <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-medium">
                                Have {restaurantData.length}  Restaurant
                            </p> 
                        </div>
                        
                        {/* Visual เกร๋ๆ บอกให้รู้ว่าสกิลล์ต่อได้ */}
                        <div className="flex gap-2">
                            <span className="text-[10px] text-slate-300 uppercase tracking-widest border border-slate-200 px-3 py-1.5 rounded-full select-none">
                                Scroll to explore
                            </span>
                        </div>
                    </div>

                    {/* 2.2 แสดงรายการร้านอาหาร (ใช้ Suspense เพื่อโชว์หน้าโหลด) */}
                
                        {/* ใส่ animation เล็กน้อยเวลาโหลดเสร็จ (ถ้ามีคลาสนี้ใน globals.css) */}
                        <div className="animate-slide-up transition-all duration-700">
                            <RestaurantCatalog RestaurantJson={restaurantData} />
                        </div>
         
                </div>

                {/* Optional: Footer เล็กๆ */}
                <div className="mt-16 text-center">
                    <p className="text-slate-300 text-[10px] uppercase tracking-[0.5em] font-light">
                        Premium Reservation Service &copy; 2024
                    </p>
                </div>
            </div>
        </main>
    );
}