'use client'
import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); 
    const { data: session } = useSession();
    const router = useRouter();
    
    const [date, setDate] = useState("");
    const [tableCount, setTableCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true); // เพิ่มสถานะตอนดึงข้อมูลครั้งแรก

    useEffect(() => {
        const fetchBooking = async () => {
            if (session?.user?.token) {
                try {
                    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/${id}`;
                    const res = await fetch(url, {
                        method: 'GET',
                        headers: { Authorization: `Bearer ${session.user.token}` }
                    });

                    // 🌟 จุดสำคัญ: เช็กว่า Response เป็น JSON จริงไหมก่อนแกะ
                    const contentType = res.headers.get("content-type");
                    if (res.ok && contentType && contentType.includes("application/json")) {
                        const result = await res.json();
                        if (result.success) {
                            setDate(dayjs(result.data.date).format("YYYY-MM-DD"));
                            setTableCount(result.data.table_count);
                        }
                    } else {
                        console.error("Failed to fetch: Server returned non-JSON or error status");
                    }
                } catch (error) {
                    console.error("Fetch Error:", error);
                } finally {
                    setFetching(false);
                }
            }
        };
        fetchBooking();
    }, [id, session]);

    const handleUpdate = async () => {
        if (!session?.user?.token) return;
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.user.token}`
                },
                body: JSON.stringify({
                    date: date,
                    table_count: tableCount
                })
            });

            if (res.ok) {
                alert("Update Successful!");
                router.push("/mybooking"); 
                router.refresh(); 
            } else {
                const err = await res.json();
                alert(err.message || "Update failed");
            }
        } catch (error) {
    // 🌟 เปลี่ยนจาก alert ข้อความนิ่งๆ เป็นดู error จริง
    console.error("Update failed details:", error);
    alert("Error updating reservation: " + error);
} finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="p-10 text-center font-serif italic text-slate-500">Loading reservation details...</div>;

    return (
        <main className="min-h-screen bg-white p-10">
            <div className="max-w-md mx-auto bg-slate-50 p-8 rounded-[32px] shadow-sm border border-slate-100 animate-in fade-in duration-500">
                <h1 className="text-2xl font-serif mb-6 italic text-slate-900">Edit Your Reservation</h1>
                
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 font-bold">Reservation Date</label>
                        <input 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2 font-bold">Tables (Max 3)</label>
                        <select 
                            value={tableCount}
                            onChange={(e) => setTableCount(Number(e.target.value))}
                            className="w-full p-3 bg-white rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all appearance-none"
                        >
                            {[1, 2, 3].map(n => <option key={n} value={n}>{n} Table{n > 1 ? 's' : ''}</option>)}
                        </select>
                    </div>

                    <button 
                        onClick={handleUpdate}
                        disabled={loading}
                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-amber-600 active:scale-95 transition-all disabled:bg-slate-300 shadow-lg shadow-slate-200"
                    >
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                    
                    <button 
                        onClick={() => router.back()}
                        className="w-full text-[10px] uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        Cancel and Go Back
                    </button>
                </div>
            </div>
        </main>
    );
}