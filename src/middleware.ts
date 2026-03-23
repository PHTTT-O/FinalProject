export { default } from "next-auth/middleware";

export const config = { 
    // 🛡️ ใส่ Path ที่ต้องการ "บังคับ Login" เท่านั้นถึงจะเข้าได้
    matcher: [
        "/mybooking/:path*",    // บังคับ Login ก่อนเข้าหน้าดู/แก้ไขการจองของตัวเอง
        "/admin/:path*",        // บังคับ Login ก่อนเข้าหน้า Admin
        "/booking/:path*",      // บังคับ Login ก่อนจะไปหน้าสร้างการจอง (ถ้ามี)
    ] 
};