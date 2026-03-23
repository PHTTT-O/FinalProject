'use client'

import { removeBooking, setBookings } from "@/redux/features/bookSlice";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { deleteReservation, getReservations } from "@/libs/apiActions";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { BookingItem } from "@/interface";

import Link from "next/link";

// 1. Interface สำหรับข้อมูลดิบ (แก้ไขให้ตรงตาม Backend ที่เราแก้ล่าสุด)
interface RawBookingResponse {
    _id: string;
    user_id: string; 
    restaurant_id: {
        _id: string;
        name: string;
        address?: string;
        phone?: string;
    } | string; // รองรับทั้งแบบ String (ID) และ Object (Populated)
    date: string;
    table_count: number;
    createdAt: string;
    restaurant_name?: string; 
}

export default function BookingList() {
    const bookingItems = useAppSelector((state: RootState) => state.bookSlice.bookItems);
    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (session?.user?.token) {
                try {
                    setIsLoading(true);
                    const res = await getReservations(session.user.token);
                    
                    // 🌟 จุดสำคัญ: แปลงข้อมูลจาก Backend เป็นรูปแบบที่ UI เข้าใจ
                    const formattedData: BookingItem[] = res.data.map((item: RawBookingResponse) => {
                        const restInfo = item.restaurant_id; 
                        const isObject = typeof restInfo === 'object' && restInfo !== null;

                        return {
                            _id: item._id,
                            user_id: item.user_id,
                            restaurant_id: isObject ? restInfo._id : (restInfo as string),
                            // ถ้า Backend ส่ง Object มา (จากการ Populate) ให้ใช้ชื่อร้านจริง
                            restaurant_name: isObject 
                                ? restInfo.name 
                                : (item.restaurant_name || "Premium Restaurant"), 
                            date: item.date,
                            table_count: item.table_count,
                            createdAt: item.createdAt
                        };
                    });

                    dispatch(setBookings(formattedData));
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, [session, dispatch]);

    const handleRemove = async (bookingId: string | undefined, restaurantId: string) => {
        if (!session?.user?.token) return;
        if (!bookingId) {
            dispatch(removeBooking(restaurantId));
            return;
        }
        
        if(!confirm("ต้องการยกเลิกการจองนี้ใช่หรือไม่?")) return;

        try {
            await deleteReservation(bookingId, session.user.token);
            dispatch(removeBooking(restaurantId));
        } catch (error) {
            console.error("Delete Error:", error);
            alert("ไม่สามารถยกเลิกการจองได้ในขณะนี้");
        }
    };

    // 🚩 2. แสดงหน้า Loading ระหว่างรอข้อมูล (จะใช้ Skeleton ที่นายทำไว้)
   

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 font-sans min-h-screen">
            {/* Header Section */}
            <div className="mb-12 border-l-4 border-amber-500 pl-6">
                <h1 className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tight">Your Reservations</h1>
                <p className="text-slate-500 font-light mt-2 uppercase tracking-[0.2em] text-[10px]">
                    Manage your premium dining experiences
                </p>
            </div>

            <div className="space-y-8">
                {bookingItems && bookingItems.length > 0 ? (
                    bookingItems.map((bookingItem: BookingItem, index: number) => (
                        <div 
                            key={bookingItem._id || index} 
                            className="group relative bg-white rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/50"
                        >
                            
                            {/* Left Side: Ticket Visual */}
                            <div className="bg-slate-950 p-8 md:w-1/3 flex flex-col justify-center items-center text-center border-r border-dashed border-slate-800">
                                <span className="text-amber-500 text-[9px] font-black uppercase tracking-[0.4em] mb-3">Booking Date</span>
                                <div className="text-4xl font-serif text-white leading-none">
                                    {dayjs(bookingItem.date).format("DD")}
                                </div>
                                <div className="text-amber-200/60 text-[11px] font-light uppercase tracking-widest mt-2">
                                    {dayjs(bookingItem.date).format("MMMM YYYY")}
                                </div>
                                <div className="mt-5 py-1.5 px-4 rounded-full border border-slate-700 text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                                    Confirmed
                                </div>
                            </div>

                            {/* Right Side: Content */}
                            <div className="p-8 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-serif text-slate-900 mb-2 italic group-hover:text-amber-600 transition-colors">
                                        {bookingItem.restaurant_name}
                                    </h3>
                                    <div className="flex items-center gap-4 text-slate-500 text-sm font-light">
                                        <span className="flex items-center gap-1.5">
                                            <span className="text-lg">🪑</span> {bookingItem.table_count} {bookingItem.table_count > 1 ? 'Tables' : 'Table'}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="text-lg">📍</span> Venue Confirmed
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="mt-8 flex justify-end items-center gap-6">
                                    <Link href={`/mybooking/edit/${bookingItem._id}`}>
        <button className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-700 transition-all py-2 px-4 rounded-xl hover:bg-blue-50">
            Edit Reservation
        </button>
    </Link>
                                    <button 
                                        onClick={() => handleRemove(bookingItem._id, bookingItem.restaurant_id)} 
                                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 transition-all py-2 px-4 rounded-xl hover:bg-red-50"
                                    >
                                        Cancel Reservation
                                    </button>
                                </div>
                            </div>
                            
                            {/* Ticket Notch Decorations (The "Cutouts") */}
                            <div className="absolute hidden md:block w-8 h-8 bg-[#fcfcfc] rounded-full -left-4 top-1/2 -translate-y-1/2 border-r border-slate-100 shadow-[inset_-4px_0_6px_rgba(0,0,0,0.02)]"></div>
                            <div className="absolute hidden md:block w-8 h-8 bg-[#fcfcfc] rounded-full -right-4 top-1/2 -translate-y-1/2 border-l border-slate-100 shadow-[inset_4px_0_6px_rgba(0,0,0,0.02)]"></div>
                        </div>
                    ))
                ) : (
                    /* Empty State */
                    <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-slate-200">
                        <div className="text-6xl mb-6 grayscale opacity-20">🍽️</div>
                        <h2 className="text-2xl font-serif text-slate-400 italic">No reservations found</h2>
                        <p className="text-slate-400 text-sm mt-2 font-light tracking-wide">Ready to discover your next favorite spot?</p>
                    </div>
                )}
            </div>
        </div>
    );
}