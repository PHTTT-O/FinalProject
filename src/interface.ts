// ข้อมูลผู้ใช้
import { getRestaurants } from "@/libs/apiActions";
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

export default async function Home() {
  // 1. ประกาศตัวแปรเป็น Array รอไว้
  let restaurants: RestaurantItem[] = []; 
  
  try {
    // 2. รับค่าจากฟังก์ชันมาเก็บไว้ที่ตัวแปรกลางก่อน (เป็น any หรือ interface ของตัวมันเอง)
    const res = await getRestaurants();
    
    // 3. ดึงเฉพาะส่วนที่เป็น Array (data) มาใส่ในตัวแปร restaurants
    // เช็กให้ชัวร์ว่า Backend ส่ง field ชื่อ 'data' มาจริงๆ
    restaurants = res; 
  } catch (e) {
    console.error("Fetch error:", e);
    restaurants = [];
  }
}