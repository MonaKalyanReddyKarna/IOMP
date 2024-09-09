"use client"


import { useDisasterStore } from '@/zustand/useDisasterStore';
import React from 'react'
import DisasterHeader from './DisasterHeader';
import Description from './Description';
import LatestPosts from './LatestPosts';
import { data } from '@/data/dummy';
import { Disaster } from '@/types/disaster';

const Page = ({ params }: { params: { slug: string } }) => {
    const disaster: Disaster = data.find((disaster) => disaster._id == params.slug) as Disaster;
    return (
        <div className='w-full max-w-[80vw] mx-auto h-screen'>
            <div className='w-full h-full flex flex-col justify-evenly'>
                {/* Heading */}
                <DisasterHeader key={params.slug} disasterData={disaster} />
                <Description />
                <LatestPosts />
            </div>
        </div>
    )
}

export default Page;