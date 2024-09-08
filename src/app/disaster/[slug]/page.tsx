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
        <div className='w-full h-screen p-12'>
            <div className='w-full h-full flex flex-col '>
                {/* Heading */}
                <DisasterHeader key={params.slug} disasterData={disaster} />
                <Description />
                <LatestPosts />
            </div>
        </div>
    )
}

export default Page;