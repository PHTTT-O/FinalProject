import Link from "next/link";
import Card from "./Card";
import { RestaurantItem } from "../interface";

interface Props {
    RestaurantJson: RestaurantItem[];
}

export default function RestaurantCatalog({ RestaurantJson }: Props) {
    // เนื่องจากข้อมูลถูก fetch มาจาก Page ระดับ Server แล้ว 
    // ตรงนี้เราไม่ต้อง await ซ้ำ (ยกเว้นส่งมาเป็น Promise)
    const restaurants = RestaurantJson;

    return (
        <div className="w-full">
            {/* 🌟 Grid Layout: ปรับให้รองรับทุกหน้าจออย่างสวยงาม */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                {restaurants.map((item) => (
                    <Link 
                        key={item._id} 
                        href={`/restaurant/${item._id}`}
                        className="w-full max-w-[380px] group"
                    >
                        {/* 🌟 Wrapper สำหรับ Card เพื่อเพิ่มเอฟเฟกต์ตอน Hover */}
                        <div className="relative transition-all duration-500 ease-out transform group-hover:-translate-y-3">
                            
                            {/* ส่วนตกแต่ง: เงาฟุ้งๆ ด้านหลังเวลา Hover */}
                            <div className="absolute inset-0 bg-amber-500/10 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* ตัว Card หลัก */}
                            <div className="relative">
                                <Card 
                                    restaurantName={item.name} 
                                    imgSrc={ "/res1.jpg"} 
                                />
                            </div>

                            {/* 🌟 เพิ่ม Overlay เล็กๆ หรือปุ่มจำลองให้ดู Interactive */}
                            <div className="mt-4 flex items-center justify-between px-2">
                                <div className="h-[1px] flex-1 bg-slate-100 group-hover:bg-amber-200 transition-colors"></div>
                                <span className="mx-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 group-hover:text-amber-600 transition-colors">
                                    View Detail
                                </span>
                                <div className="h-[1px] flex-1 bg-slate-100 group-hover:bg-amber-200 transition-colors"></div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State กรณีไม่มีข้อมูล */}
            {restaurants.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-400 font-serif italic">No restaurants found in this collection.</p>
                </div>
            )}
        </div>
    );
}