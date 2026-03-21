// ข้อมูลผู้ใช้
export interface UserItem {
  _id?: string;
  name: string;
  email: string;
  telephone: string;
  role: 'user' | 'admin';
  token?: string; // สำหรับเก็บ JWT
}

// ข้อมูลร้านอาหาร
export interface RestaurantItem {
  _id: string;
  name: string;
  address: string;
  phone: string;
  open_time: string;
  close_time: string;
  id?: string; // จาก virtuals
}

// ข้อมูลการจอง (ใช้ใน bookSlice และหน้า CRUD)
export interface BookingItem {
  _id?: string;
  user_id: string;         // ObjectId ของ User
  restaurant_id: string;   // ObjectId ของ Restaurant
  date: string;            // เก็บเป็น ISO String หรือ YYYY-MM-DD
  table_count: number;     // 1 - 3 เท่านั้นตาม Schema
  createdAt?: string;
  // เพิ่มเติมสำหรับแสดงผลใน Frontend (Populate)
  restaurant_name?: string; 
}