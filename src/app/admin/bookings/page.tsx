'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// แก้ Error "Unexpected any" โดยการกำหนด Type ให้ชัดเจน
interface ReservationItem {
    _id: string;
    user_id: { name: string; email: string };
    restaurant_id: { name: string };
    date: string;
    table_count: number;
}

export default function AdminDashboard() {
    const { data: session } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState<ReservationItem[]>([]);
    const [loading, setLoading] = useState(true);

    // แก้ Error "React Hook useEffect is called conditionally"
    // ย้าย useEffect ขึ้นมาไว้ก่อนการเช็คเงื่อนไข return เสมอ!
    useEffect(() => {
        const fetchAllBookings = async () => {
            // แก้ Error "session is possibly null" ด้วยการเช็ค Optional Chaining
            if (session?.user?.token && session.user.role === 'admin') {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/all`, {
                        headers: { Authorization: `Bearer ${session.user.token}` }
                    });
                    const result = await res.json();
                    if (result.success) setBookings(result.data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else if (session && session.user.role !== 'admin') {
                // ถ้าไม่ใช่ admin ให้เด้งออก
                router.push('/');
            }
        };
        fetchAllBookings();
    }, [session, router]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this booking?") || !session?.user?.token) return;
        
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${session.user.token}` }
            });

            if (res.ok) {
                setBookings(prev => prev.filter(b => b._id !== id));
                alert("Deleted successfully");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // แสดง Loading ระหว่างรอข้อมูล หรือรอเช็คสิทธิ์
    if (loading) return <div className="p-10 text-center font-serif italic text-slate-500">Loading Admin Dashboard...</div>;

    // ถ้าไม่ใช่ admin จะไม่เห็นส่วนนี้ (เด้งออกไปแล้วใน useEffect)
    if (session?.user?.role !== 'admin') return null;

    return (
        <main className="p-10 bg-white min-h-screen">
            <h1 className="text-3xl font-serif mb-8 italic text-slate-900 border-b pb-4">Admin Dashboard</h1>
            <div className="overflow-hidden shadow-sm border border-slate-200 rounded-[24px]">
                <table className="w-full text-left border-collapse bg-slate-50/30">
                    <thead>
                        <tr className="bg-slate-900 text-[10px] uppercase tracking-[0.2em] text-white">
                            <th className="p-5">Customer</th>
                            <th className="p-5">Restaurant</th>
                            <th className="p-5">Date</th>
                            <th className="p-5">Tables</th>
                            <th className="p-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-white transition-colors">
                                <td className="p-5 text-sm font-bold text-slate-900">{booking.user_id?.name || 'Guest'}</td>
                                <td className="p-5 text-sm text-slate-600">{booking.restaurant_id?.name}</td>
                                <td className="p-5 text-sm text-slate-500">{new Date(booking.date).toLocaleDateString('en-GB')}</td>
                                <td className="p-5 text-sm font-medium">{booking.table_count}</td>
                                <td className="p-5 text-right space-x-4">
                                    <Link href={`/mybooking/edit/${booking._id}`}>
                                        <button className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-700">Edit</button>
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(booking._id)}
                                        className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {bookings.length === 0 && (
                    <div className="p-10 text-center text-slate-400 italic text-sm">No reservations found in the system.</div>
                )}
            </div>
        </main>
    );
}