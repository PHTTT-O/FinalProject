"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo - ใช้ Font Serif ให้เหมือนหน้า Home */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center gap-1">
              <span className="text-3xl font-serif font-bold tracking-tighter text-slate-900 group-hover:text-amber-600 transition-colors">
                RESERVE<span className="text-amber-500 italic font-medium">ME</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-10 font-sans">
            
            {session ? (
              // แสดงเมื่อ Login แล้ว
              <div className="flex items-center gap-8">
                <div className="hidden sm:flex flex-col items-end border-r border-slate-200 pr-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                    Distinguished Guest
                  </span>
                  <span className="text-sm font-bold text-slate-800 tracking-wide">
                    {session.user?.name}
                  </span>
                </div>
                
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="group flex items-center gap-2 text-slate-400 hover:text-red-500 transition-all text-xs font-bold uppercase tracking-widest"
                >
                  <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-red-50 transition-all">
                    🚪
                  </span>
                  Sign Out
                </button>
              </div>
            ) : (
              // แสดงเมื่อยังไม่ได้ Login
              <div className="flex items-center gap-8">
                <Link 
                  href="/login" 
                  className="text-slate-500 hover:text-amber-600 font-bold text-xs uppercase tracking-[0.2em] transition-all"
                >
                  Sign In
                </Link>
                
                <Link 
                  href="/register"
                  className="bg-slate-950 text-amber-500 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 hover:bg-slate-800 hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}