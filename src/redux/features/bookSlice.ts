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
      state.bookItems = state.bookItems.filter(
        (item) => item.restaurant_id !== action.payload
      );
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;