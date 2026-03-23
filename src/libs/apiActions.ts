import { RestaurantItem, BookingItem } from "../interface";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

/** --- RESTAURANTS (สำหรับคนที่ 2) --- **/

// ดึงรายชื่อร้านทั้งหมด (ข้อ 3: User View Product)
export async function getRestaurants(): Promise<RestaurantItem[]> {
    const response = await fetch(`${BACKEND_URL}/restaurant`);
    if (!response.ok) throw new Error("Failed to fetch restaurants");
    const json = await response.json();
    return json.data; // Backend ส่วนใหญ่จะส่งมาในรูปแบบ { success: true, data: [...] }
}

// ดึงข้อมูลร้านเดียว (สำหรับหน้าจอง)
export async function getRestaurant(id: string): Promise<RestaurantItem> {
    const response = await fetch(`${BACKEND_URL}/restaurant/${id}`);
    if (!response.ok) throw new Error("Failed to fetch restaurant");
    const json = await response.json();
    return json.data;
}

/** --- RESERVATIONS (สำหรับคนที่ 2 และ 3) --- **/

// สร้างการจองใหม่ (ข้อ 4: User Create Booking)
export async function createReservation(booking: BookingItem, token: string) {
    const response = await fetch(`${BACKEND_URL}/reservation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            restaurant_id: booking.restaurant_id,
            date: booking.date,
            table_count: booking.table_count
        }),
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message || `Backend Error: ${response.status}`);
    }
    return await json
}

// ดูรายการจอง (ข้อ 5: User View / ข้อ 10: Admin View)
export async function getReservations(token: string) {
    const response = await fetch(`${BACKEND_URL}/reservation`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch reservations");
    return await response.json();
}

// ลบการจอง (ข้อ 7: User Delete / ข้อ 12: Admin Delete)
export async function deleteReservation(id: string, token: string) {
    const response = await fetch(`${BACKEND_URL}/reservation/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    return await response.json();
}

// แก้ไขการจอง (ข้อ 6: User Update / ข้อ 11: Admin Update)
export async function updateReservation(id: string, booking: Partial<BookingItem>, token: string) {
    const response = await fetch(`${BACKEND_URL}/reservation/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
    });
    return await response.json();
}