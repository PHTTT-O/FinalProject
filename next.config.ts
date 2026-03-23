/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // อนุญาตให้โหลดรูปจากเว็บนี้
        port: '',
        pathname: '/**',
      },
      // แนะนำ: ให้ใส่ Domain ของ Backend นายไว้ด้วยเลย เผื่อต้องโหลดรูปจริงจาก Server
      {
        protocol: 'https',
        hostname: 'drive.google.com', // ตัวอย่าง ถ้าใช้รูปจาก Google Drive
        port: '',
        pathname: '/**',
      },
      // ถ้า Backend นายมี Domain แล้ว เช่น my-api.render.com ให้ใส่ตรงนี้ด้วย
    ],
  },
};

export default nextConfig;