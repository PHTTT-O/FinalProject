"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ใช้ Link ของ Next.js แทน <a>

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/");
      router.refresh();
    } else {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] p-4 font-sans">
      {/* Background Decorative Element (วงกลมจางๆ ให้ดูมีอะไร) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-50">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-amber-50 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-slate-100 blur-[120px]"></div>
      </div>

      {/* Card Container */}
      <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl shadow-slate-200/60 w-full max-w-md border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif italic text-slate-900 mb-3">
            Welcome <span className="text-amber-600 not-italic font-medium">Back</span>
          </h1>
          <div className="w-12 h-1 bg-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-500 font-light tracking-wide text-sm uppercase">
            Sign in to your exclusive account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-1 focus:ring-amber-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-300"
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">
              Password
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-1 focus:ring-amber-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-300"
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-slate-900 text-amber-500 p-4 rounded-2xl font-bold tracking-widest uppercase shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:text-amber-400 active:scale-[0.98] transition-all mt-6"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
          <p className="text-sm text-slate-500 font-light">
            Don’t have an account? 
            <Link href="/register" className="text-amber-600 font-bold hover:text-amber-700 ml-2 underline decoration-amber-200 underline-offset-4">
                Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}