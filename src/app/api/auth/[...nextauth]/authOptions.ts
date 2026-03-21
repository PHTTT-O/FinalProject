import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          // 1. ยิงไปที่ Login Backend ของนาย
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          const userResponse = await res.json();

          // ถ้า Login สำเร็จ Backend นายจะส่ง { success: true, token: "..." }
          if (res.ok && userResponse.success) {
            
            // 2. ต้องไปดึงข้อมูล User เพิ่มจาก /auth/me เพื่อเอา Role และข้อมูลอื่นๆ
            const profileRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
              method: "GET",
              headers: { Authorization: `Bearer ${userResponse.token}` },
            });

            const profileData = await profileRes.json();

            if (profileRes.ok && profileData.success) {
              // รวมร่างข้อมูลโปรไฟล์เข้ากับ Token เพื่อส่งไปเก็บใน Session
              return {
                ...profileData.data, // _id, name, email, telephone, role
                token: userResponse.token,
              };
            }
          }
          return null;
        } catch (error) {
          console.error("Auth Error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // จังหวะ Login ครั้งแรก user จะมีค่า ให้ยัดใส่ token
      if (user) {
        return { ...token, ...user } as JWT;
      }
      return token;
    },
    async session({ session, token }) {
      // ดึงค่าจาก token มาใส่ใน session.user (TypeScript จะไม่บ่นเพราะทำ .d.ts แล้ว)
      if (token && session.user) {
        session.user._id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.telephone = token.telephone;
        session.user.role = token.role;
        session.user.token = token.token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // ถ้าไม่ได้ Login จะเด้งมาหน้านี้
  },
  session: {
    strategy: "jwt", // ใช้ JWT Strategy ตามที่ Backend นายทำมา
  },
};