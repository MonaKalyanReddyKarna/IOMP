"use client";
import React from 'react';
import Disasters from './Disasters';
import { useDisasterStore } from '@/zustand/useDisasterStore';
import DisasterInfo from './DisasterInfo';

const Hero = () => {
    const { disasters } = useDisasterStore();

    return (
        <div className='p-2 h-full overflow-y-auto'>
            <Disasters disasters={disasters} />
        </div>
    );
};

export default Hero;
