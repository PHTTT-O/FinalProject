'use client'

import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

interface Props {
    restaurantName: string;
    imgSrc: string;
}

export default function Card({ restaurantName, imgSrc }: Props) {
    // 1. สร้างตัวแปรเช็ก: ถ้าไม่มีรูป ให้ใช้รูป Placeholder สีม่วงสวยๆ แทน
    const finalSrc = imgSrc && imgSrc.trim() !== "" 
        ? imgSrc 
        : "https://via.placeholder.com/400x300/7c3aed/ffffff?text=No+Image"; 
        // (หรือจะใช้ path รูปในเครื่องนายก็ได้ เช่น /img/default.jpg)

    return (
        <InteractiveCard contentName={restaurantName}>
            <div className="relative w-full h-[70%] bg-gray-100">
                <Image 
                    src={finalSrc} // 2. ใช้ finalSrc แทน imgSrc ตรงๆ
                    alt={restaurantName}
                    fill
                    className="object-cover rounded-t-[10px]"
                />
            </div>
            <div className="text-black p-[10px] h-[30%] font-semibold">
                {restaurantName}
            </div>
        </InteractiveCard>
    );
}