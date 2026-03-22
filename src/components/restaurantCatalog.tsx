// 'use client'
import Link from "next/link";
import Card from "./Card";
import { RestaurantItem } from "../interface";

// 2. กำหนด Props ให้เป็น Promise ของกล่องใหญ่ (เพราะข้างล่างมี await)
interface Props {
  RestaurantJson: RestaurantItem[];
}
export default async function RestaurantCatalog({ RestaurantJson }: Props){
        const response = await RestaurantJson;
    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-wrap gap-6 justify-center p-6">
                {response.map((item)=>(
                    <Link key={item._id} href={`/restaurant/${item._id}`}>
                        {/* <Card venueName={item.name} imgSrc={item.picture} /> ไม่มีรูป*/}
                        <Card restaurantName={item.name} imgSrc="" />
                    </Link>  
                ))}
            </div>
        </div>
    
    );

}