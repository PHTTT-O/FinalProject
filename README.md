Vercel:


[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ZoerMYa3)



//// สร้าง .env.local เหมือนจาร ใส่ตามนี้ 

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000   
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET='Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY='


//// สร้าง .next-env.d.ts แล้วใส่
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

ก่อนจะใช้ สร้างอีกterminal  cd backend แล้วไป npm start ก่อน 
แล้วลองเข้า http://localhost:5000/restaurant ดูว่าข้อมูลขึ้นไหม
แล้วค่อย npm run dev ไฟลหลัก 
ลองเข้า http://localhost:3000/test ถ้าเขียวคือผ่าน


npm install ใน backend มั้ง และไฟลหลักด้วย
ไฟล ปกติ
npm install @reduxjs/toolkit react-redux redux-persist next-auth

ไฟล Backend
npm install express mongoose dotenv cors bcryptjs jsonwebtoken cookie-parser && npm install -D nodemon
