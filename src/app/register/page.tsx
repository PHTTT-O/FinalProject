"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    password: "",
    role: "user", // ตั้ง Default เป็น user ไว้ก่อน
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
        alert("Register Successful!");
        router.push("/login"); // สมัครเสร็จส่งไปหน้า Login
      } else {
        alert(data.msg || "Register Failed password must be at least 6 characters ");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

 return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Card Container */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-purple-700">Create Account</h1>
          <p className="text-gray-500 mt-2">Join us and discover the best restaurants</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="username" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              onChange={(e)=>setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@gmail.com" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              onChange={(e)=>setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
            <input 
              type="tel" 
              placeholder="081-234-5678" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              onChange={(e)=>setFormData({...formData, telephone: e.target.value})} 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              onChange={(e)=>setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-purple-600 text-white p-3 rounded-xl font-semibold shadow-lg hover:bg-purple-700 hover:shadow-purple-200 active:scale-[0.98] transition-all mt-4"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? 
          <a href="/login" className="text-purple-600 font-bold hover:underline ml-1">Log in</a>
        </p>
      </div>
    </div>
  );
}