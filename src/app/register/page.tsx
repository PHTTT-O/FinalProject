"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    password: "",
    role: "user",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      alert("สมัครสมาชิกสำเร็จ!");
      router.push("/login");
    } else {
      const msg = data.msg || "";
     if (res.status === 400 || res.status === 409) {
  alert("คุณสมัครสมาชิกไปแล้ว กรุณาเข้าสู่ระบบแทน");
} else {
  alert(msg || "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
}
    }
  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] p-6 font-sans relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 opacity-40">
        <div className="absolute top-[10%] right-[5%] w-[35%] h-[35%] rounded-full bg-amber-50 blur-[100px]"></div>
        <div className="absolute bottom-[5%] left-[5%] w-[30%] h-[30%] rounded-full bg-slate-100 blur-[100px]"></div>
      </div>

      <div className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl shadow-slate-200/50 w-full max-w-lg border border-slate-50 transition-all">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-amber-600 font-bold tracking-[0.3em] text-[10px] uppercase block mb-2">
            Privilege Membership
          </span>
          <h1 className="text-4xl font-serif italic text-slate-900 mb-2">
            Create <span className="text-amber-600 not-italic font-medium">Account</span>
          </h1>
          <p className="text-slate-400 font-light text-sm tracking-wide">
            ร่วมเป็นส่วนหนึ่งกับเรา เพื่อสัมผัสประสบการณ์มื้ออาหารที่เหนือระดับ
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="ชื่อ-นามสกุล" 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-1 focus:ring-amber-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-300 text-sm"
                onChange={(e)=>setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Telephone</label>
              <input 
                type="tel" 
                placeholder="08X-XXX-XXXX" 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-1 focus:ring-amber-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-300 text-sm"
                onChange={(e)=>setFormData({...formData, telephone: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@email.com" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-1 focus:ring-amber-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-300 text-sm"
              onChange={(e)=>setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-1 focus:ring-amber-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-300 text-sm"
              onChange={(e)=>setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-slate-900 text-amber-500 p-4 rounded-2xl font-bold tracking-[0.2em] uppercase shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:text-amber-400 active:scale-[0.98] transition-all mt-4 text-sm"
          >
            Create Membership
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 pt-8 border-t border-slate-50 text-center">
          <p className="text-xs text-slate-400 font-light tracking-wide">
            Already a member? 
            <Link href="/login" className="text-amber-600 font-bold hover:text-amber-700 ml-2 underline decoration-amber-200 underline-offset-4">
                Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}