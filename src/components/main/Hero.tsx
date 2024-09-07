"use client"
import React, { useState } from 'react';
import Disasters from './Disasters';
import { useDisasterStore } from '@/zustand/useDisasterStore';

const Hero = () => {
    const { disasters } = useDisasterStore();
    const [section, setSection] = useState<'disasters' | 'disasterinfo'>('disasters');

    return (
        <div className='p-2 h-full overflow-y-auto'>
            <Disasters disasters={disasters} />
            {/* <DisasterInfo /> */}
        </div>
    );
};

export default Hero;
