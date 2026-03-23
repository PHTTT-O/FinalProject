import { RestaurantItem, BookingItem } from "../interface";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

/** --- RESTAURANTS --- **/

export async function getRestaurants(): Promise<RestaurantItem[]> {
    const response = await fetch(`${BACKEND_URL}/restaurant`, { cache: 'no-store' }); // ดึงสดเสมอ
    if (!response.ok) throw new Error("Failed to fetch restaurants");
    const json = await response.json();
    return json.data; 
}

export async function getRestaurant(id: string): Promise<RestaurantItem> {
    const response = await fetch(`${BACKEND_URL}/restaurant/${id}`, { cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch restaurant");
    const json = await response.json();
    return json.data;
}

/** --- RESERVATIONS --- **/

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
    if (!response.ok) throw new Error(json.message || "Failed to create reservation");
    return json; // คืนค่า json object ออกไปเลย
}

export async function getReservations(token: string) {
    const response = await fetch(`${BACKEND_URL}/reservation`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store' // สำคัญมาก! เพื่อให้เห็นรายการจองใหม่ๆ ทันที
    });
    if (!response.ok) throw new Error("Failed to fetch reservations");
    return await response.json();
}

export async function deleteReservation(id: string, token: string) {
    const response = await fetch(`${BACKEND_URL}/reservation/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || "Failed to delete reservation");
    return json;
}

export async function updateReservation(id: string, booking: Partial<BookingItem>, token: string) {
    const response = await fetch(`${BACKEND_URL}/reservation/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.message || "Failed to update reservation");
    return json;
}