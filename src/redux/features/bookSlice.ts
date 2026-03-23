import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "@/interface";

interface BookingState {
  bookItems: BookingItem[];
}

const initialState: BookingState = {
  bookItems: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      // เช็กว่ามีการจองร้านเดิมอยู่แล้วไหม (ตามเงื่อนไข Test Case 1)
      const remainItems = state.bookItems.filter(
        (item) => item.restaurant_id !== action.payload.restaurant_id
      );
      state.bookItems = [...remainItems, action.payload];
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      // ลบโดยใช้ ID ของร้านหรือ ID การจอง
      // console.log("🎯 ID ที่ปุ่มส่งมาลบ:", action.payload);
      
      // 2. แอบดูว่าใน Store เรามี ID อะไรเก็บอยู่บ้าง?
      // console.log("📦 ID ทั้งหมดในตระกร้า:", state.bookItems.map(i => i.restaurant_id));
      state.bookItems = state.bookItems.filter(
        (item) => item.restaurant_id !== action.payload);
      console.log("remove success. Remaining items:", state.bookItems.length);
    },
    setBookings: (state, action: PayloadAction<BookingItem[]>) => {
      // เอา Array ข้อมูลจาก Backend มาใส่ทับใน Store
      state.bookItems = action.payload;
    },
  },
});

export const { addBooking, removeBooking , setBookings} = bookSlice.actions;
export default bookSlice.reducer;