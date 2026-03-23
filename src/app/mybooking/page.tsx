'use client'

import BookingList from "@/components/BookingList"

export default function myBooking(){
    return(
        <main className="bg-white min-h-screen w-full flex flex-col items-center pt-12 pb-20">
            <BookingList>
            </BookingList>
        </main>
    )
}