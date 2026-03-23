'use client'
import { BookingItem } from "@/interface";
import dayjs ,{ Dayjs } from "dayjs";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import DateReserve from "./DateReserve";
import { createReservation } from "@/libs/apiActions";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Props {
  rid: string;
  restaurantName: string;
}

export default function CreateBooking({ rid, restaurantName }: Props){
    const dispatch = useDispatch<AppDispatch>()
    const [bookingDate , setBookingDate] = useState<Dayjs|null>(null);
    const [tableCount , setTableCount] = useState<number>(0)
    const { data: session } = useSession();
    const makeBooking = async ()=>{
        if (!bookingDate) { alert("กรุณาเลือกวันที่ต้องการจอง"); return; }
        if (!session) {
            alert("กรุณาล็อกอินก่อนทำการจองครับ!");
            return;
        }
        try {
            console.log("🔑 Token ที่จะส่งไป:", session.user.token);
            // เตรียมข้อมูลที่จะส่งไป Backend
            const item: BookingItem = {
                user_id: session.user._id, // เอา ID จริงจากคนล็อกอิน
                restaurant_id: rid,
                date: dayjs(bookingDate).format("YYYY/MM/DD"),
                table_count: tableCount,
                createdAt: new Date().toISOString(),
                restaurant_name: restaurantName,
            };

            // ✨ 1. ยิง API ไปเซฟลง Database ก่อน
            const response = await createReservation(item, session.user.token);

            // ✨ 2. ถ้า Backend ตอบกลับมาว่า Success (ไม่ติด catch) ค่อยบันทึกลง Redux
            // แนะนำให้เอา _id ของการจองที่ Backend สร้างให้ ยัดใส่กลับไปใน item ด้วยครับ
            const bookingToRedux = {
                ...item,
                _id: response.data._id // สมมติว่า Backend ส่ง _id กลับมาใน response.data
            };
            
            dispatch(addBooking(bookingToRedux));
            console.log("success to submit")

        } catch (error) {
            console.error("Booking Error:", error);
            alert("เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่ครับ");
        }      
    }
    return(
        <div className="flex flex-col m-[5px]">
            <DateReserve onDateChange={(value) => setBookingDate(value)}/>
            <FormControl className="my-[8px]">
                        <InputLabel>Select your amout of table</InputLabel>
                        <Select 
                            id="tableCount"
                            value={tableCount}
                            label="Select your amout of table"
                            onChange={(e)=>{setTableCount(e.target.value)}}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
            <button className="bg-indigo-500 text-white text-xl rounded-xl p-[8px]  hover:bg-indigo-600 my-[8px]" onClick={makeBooking}>booking</button>
        </div>
        
        
    )
}