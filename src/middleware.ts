export { default } from "next-auth/middleware";

export const config = { 
    // ใส่เฉพาะหน้าที่ "ต้อง Login เท่านั้น" ถึงจะเข้าได้
    // หน้าอื่นๆ ที่ไม่อยู่ในนี้ (เช่น /, /login, /register, /restaurant) จะเข้าได้ปกติ
    matcher: [

    ] 
};
///ยังไม่ทำรอพวกมึงก่อน