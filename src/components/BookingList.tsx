'use client'

import { removeBooking ,setBookings} from "@/redux/features/bookSlice";
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { deleteReservation ,getReservations} from "@/libs/apiActions";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function BookingList(){
    const bookingItems = useAppSelector((state:any)=>state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    const { data: session, status } = useSession();
useEffect(() => {
        const fetchBookings = async () => {
            if (session?.user?.token) {
                try {
                    const res = await getReservations(session.user.token);
                    
                    // 🕵️‍♂️ ไม้ตาย: แอบดูข้อมูลดิบๆ ที่ Backend ส่งมา! (เปิด Console ดูได้เลยครับ)
                    console.log("👉 ข้อมูลดิบจาก Backend:", res.data);

                    const formattedData = res.data.map((item: any) => {
                        
                        // 1. ดึงก้อนข้อมูลร้านอาหารมา (ดักไว้ทั้งชื่อฟิลด์ restaurant และ restaurant_id)
                        const restaurantObj = item.restaurant || item.restaurant_id;
                        
                        // 2. เช็กว่าก้อนนั้นมันเป็น Object ที่มีข้อมูลครบถ้วนไหม
                        const isObject = typeof restaurantObj === 'object' && restaurantObj !== null;

                        return {
                            ...item,
                            // ดึง ID ออกมาให้ถูกต้อง
                            restaurant_id: isObject ? restaurantObj._id : restaurantObj,
                            
                            // 🌟 ดึงชื่อร้านออกมา (ถ้ามี Object ให้ใช้ .name เลย)
                            restaurant_name: isObject ? restaurantObj.name : (item.restaurant_name || "Unknown Restaurant")
                        };
                    });

                    dispatch(setBookings(formattedData));

                } catch (error) {
                    console.error("Error fetching bookings:", error);
                }
            }
        };

        fetchBookings();
    }, [session, dispatch]);

    const handleRemove = async (bookingId: string | undefined, restaurantId: string) => {
        if (!session) {
            alert("กรุณาล็อกอินก่อนทำรายการ");
            return;
        }

        // เช็กว่ามี ID ของการจองไหม (กันพลาด)
        if (!bookingId) {
            // กรณีที่เพิ่งกดจองแล้ว Redux ยังไม่มี _id จริงๆ จาก DB 
            // ให้ลบแค่หน้าจอไปก่อน
            dispatch(removeBooking(restaurantId));
            return;
        }

        try {
            // ✨ 1. สั่ง Backend ลบข้อมูลใน Database ทิ้งก่อน 
            // (ส่ง _id ของการจอง และ Token ของผู้ใช้ไป)
            await deleteReservation(bookingId, session.user.token);

            // ✨ 2. ถ้า Backend ลบผ่านฉลุย (ไม่ Error) ค่อยสั่ง Redux ลบออกจากหน้าจอ
            dispatch(removeBooking(restaurantId));
            console.log("ลบการจองสำเร็จ!");

        } catch (error) {
            console.error("Delete Error:", error);
            alert("ไม่สามารถลบการจองได้ครับ");
        }
    };
    return(
        <div className="">
            {
                bookingItems.length > 0 ?   
                bookingItems.map((bookingItem:any,index:any)=>(
                    <div key = {index} className="rounded-xl border-blue-500 border-2 w-[700px] m-10 p-[25px]">
                        <div className="p-[5px] text-black"> Restaurant Name : {bookingItem.restaurant_name} </div>    
                        <div className="p-[5px] text-black"> Booking Date : {dayjs(bookingItem.date).format("YYYY/MM/DD")} </div> 
                        <button onClick={() => handleRemove(bookingItem._id, bookingItem.restaurant_id)} className="bg-indigo-500 rounded-xl text-white p-[5px] hover:bg-indigo-600 transition-colors">remove booking</button>
                    </div>
                    
                )
                  
                ):<div className="text-black text-2xl">
                    No Restaurant Booking
                    
                </div>
            }
        </div>
    );
}


//   _id?: string;
//   user_id: string;         // ObjectId ของ User
//   restaurant_id: string;   // ObjectId ของ Restaurant
//   date: string;            // เก็บเป็น ISO String หรือ YYYY-MM-DD
//   table_count: number;     // 1 - 3 เท่านั้นตาม Schema
//   createdAt?: string;
//   // เพิ่มเติมสำหรับแสดงผลใน Frontend (Populate)
//   restaurant_name?: string; 