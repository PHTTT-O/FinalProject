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
    const [tableCount , setTableCount] = useState<number>(1) // ปรับ default เป็น 1 จะได้ดูสวยกว่า 0
    const { data: session } = useSession();

    const makeBooking = async ()=>{
        if (!bookingDate) { alert("กรุณาเลือกวันที่ต้องการจอง"); return; }
        if (!session) {
            alert("กรุณาล็อกอินก่อนทำการจองครับ!");
            return;
        }
        try {
            const item: BookingItem = {
                user_id: session.user._id,
                restaurant_id: rid,
                date: dayjs(bookingDate).format("YYYY/MM/DD"),
                table_count: tableCount,
                createdAt: new Date().toISOString(),
                restaurant_name: restaurantName,
            };

            const response = await createReservation(item, session.user.token);

            const bookingToRedux = {
                ...item,
                _id: response.data._id 
            };
            
            dispatch(addBooking(bookingToRedux));
            alert("จองโต๊ะสำเร็จ! ขอให้มีความสุขกับมื้ออาหารสุดพิเศษ");

        } catch (error) {
            console.error("Booking Error:", error);
            alert("เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่ครับ");
        }      
    }

    return(
        <div className="flex flex-col gap-6 w-full">
            {/* 🗓️ Date Picker Section */}
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Select Date
                </label>
              
                    <DateReserve onDateChange={(value) => setBookingDate(value)}/>
             
            </div>

            {/* 🍽️ Table Selection Section */}
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Number of Tables
                </label>
                <FormControl fullWidth className="bg-slate-400 rounded-2xl overflow-hidden">
                    <Select 
                        id="tableCount"
                        value={tableCount}
                        onChange={(e)=>{setTableCount(Number(e.target.value))}}
                        sx={{
                            color: 'white',
                            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            '.MuiSvgIcon-root': { color: '#f59e0b' }, // Amber color for icon
                            padding: '4px'
                        }}
                    >
                        {[1, 2, 3].map((num) => (
                            <MenuItem key={num} value={num}>
                                {num} {num === 1 ? 'Table' : 'Tables'}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {/* 🔔 Submit Button */}
            <button 
                className="w-full bg-amber-600 text-white text-sm font-bold uppercase tracking-[0.2em] rounded-2xl py-5 shadow-xl shadow-amber-900/20 hover:bg-amber-500 hover:-translate-y-1 transition-all duration-300 active:scale-95 mt-4" 
                onClick={makeBooking}
            >
                Confirm Reservation
            </button>

            <p className="text-[9px] text-slate-500 text-center leading-relaxed italic">
                By clicking confirm, you agree to our <br/>
                premium dining terms and conditions.
            </p>
        </div>
    )
}