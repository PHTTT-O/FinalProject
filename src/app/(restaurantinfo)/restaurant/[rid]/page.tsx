import { getRestaurant } from "@/libs/apiActions";

import Image from "next/image";
export default async function RestaurantDetailPage({params}:({params:Promise<{rid:string}>})){
    const {rid} = await params;
    const response = await getRestaurant(rid);
    const mock = new Map();
    // mock.set("001",{venueName:"The Bloom Pavilion",img:"/img/bloom.jpg"});
    // mock.set("002",{venueName:"Spark Space",img:"/img/sparkspace.jpg"});
    // mock.set("003",{venueName:"The Grand Table",img:"/img/grandtable.jpg"});
    return(
        <main className="flex flex-row items-center gap-10 p-10 items-start">
            <div className="w-[50%]">
                {/* <Image src={response.picture} alt = 'Venue Picture' width={0} height = {0} sizes='100vw'  className="rounded-lg rounded-lg w-full h-auto"/> */}
            </div>
            <div className="flex flex-col">
                <div> Name : {response.name}</div>
                <div> Adrdess : {response.address}</div>
                <div> Open And Close Time : {response.open_time} - {response.close_time}</div> 

                <div> Tel : {response.phone}</div>

            </div>
            
        </main>
    );
}