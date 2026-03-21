"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-lg border-b-2 border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo - ขยายใหญ่ขึ้นและหนาขึ้น */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-black tracking-tighter text-purple-700 hover:text-purple-800 transition-all">
              RESERVE<span className="text-gray-900 font-light">ME</span>
            </Link>
          </div>

          {/* Navigation Links - ขยายขนาดตัวอักษรและปุ่ม */}
          <div className="flex items-center gap-8">
            
            {/* ปุ่ม Check API (แถมให้แบบชัดๆ) */}
            <a 
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurant`}
              target="_blank"
              className="hidden md:block text-gray-500 hover:text-purple-600 font-bold text-base transition-colors"
            >
              Backend API 🔍
            </a>
       <Link href="/test" className="text-purple-600 font-bold hover:underline">Test API</Link>
            {session ? (
              // แสดงเมื่อ Login แล้ว
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Logged in as</span>
                  <span className="text-lg font-bold text-gray-800 border-b-2 border-purple-400">
                    {session.user?.name}
                  </span>
                </div>
                
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-50 text-red-600 px-6 py-2.5 rounded-2xl text-base font-black border-2 border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-90 shadow-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              // แสดงเมื่อยังไม่ได้ Login
              <div className="flex items-center gap-5">
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-purple-700 font-black text-lg transition-all"
                >
                  Sign In
                </Link>
                
                <Link 
                  href="/register"
                  className="bg-purple-600 text-white px-8 py-3 rounded-2xl text-lg font-black shadow-xl shadow-purple-200 hover:bg-purple-700 hover:-translate-y-0.5 transition-all active:scale-90"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}