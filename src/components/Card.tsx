'use client'

import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
interface Props {
    restaurantName : string;
    imgSrc : string;
}
export default function Card({restaurantName , imgSrc}:Props){

    return(
        <InteractiveCard contentName={restaurantName}>
             <div className = "relative w-full h-[70%]">
                <Image src = {imgSrc}
                 alt = 'cardPicture'
                fill
                className="object-cover rounded-t-[10px]"/>
           
            </div>
            <div className = "text-black p-[10px] h-[30%]">
                {restaurantName}
           
            </div>
            
        </InteractiveCard>
       
    );
}