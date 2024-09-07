"use client"

import DisasterCard from '@/components/main/DisasterCard';
import { useDisasterStore } from '@/zustand/useDisasterStore';
import React from 'react'
import DisasterHeader from './DisasterHeader';
import Description from './Description';
import LatestPosts from './LatestPosts';

const page = ({ params }: { params: { slug: string } }) => {
    const disaster = useDisasterStore((state) => state.selectedDisaster);
    return (
        <div className='w-full h-screen p-12'>
            <div className='w-full h-full flex flex-col '>
                {/* Heading */}
                <DisasterHeader key={disaster._id} disasterData={disaster} />
                <Description />
                <LatestPosts />
            </div>
        </div>
    )
}

export default page;