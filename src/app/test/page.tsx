"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function TestPage() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
  const [backendStatus, setBackendStatus] = useState("Checking...");

  // เช็กว่ายิง API ไปหา Backend ติดไหม
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurant`)
      .then(res => res.ok ? setBackendStatus("Connected! ✅") : setBackendStatus("Failed ❌"))
      .catch(() => setBackendStatus("Cannot Reach Backend ❌"));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>🛠 System Check</h1>
      <hr />
      
      <h3>1. NextAuth Session</h3>
      <pre>{session ? JSON.stringify(session.user, null, 2) : "Not Logged In (Please Login first)"}</pre>

      <h3>2. Redux Store</h3>
      <button onClick={() => dispatch(addBooking({ 
          restaurant_id: "test-123", 
          user_id: session?.user?._id || "guest", 
          date: "2024-05-20", 
          table_count: 2 
        }))}>
        Test Add Booking to Redux
      </button>
      <p>Items in Store: {bookItems.length}</p>

      <h3>3. Backend Connection</h3>
      <p>Status: <strong>{backendStatus}</strong></p>
      <p>URL: {process.env.NEXT_PUBLIC_BACKEND_URL}</p>
    </div>
  );
}