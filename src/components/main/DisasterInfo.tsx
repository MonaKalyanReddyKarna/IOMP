import { useDisasterStore } from '@/zustand/useDisasterStore';
import { ArrowLeft } from 'lucide-react';
import React from 'react'

const DisasterInfo = () => {
    const disaster = useDisasterStore((state) => state.selectedDisaster);
    const setSection = useDisasterStore((state) => state.setSection);
    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-row items-center justify-start gap-2' onClick={() => setSection("disasters")}>
                <ArrowLeft size={25} />
            </div>
            <div className='px-8 flex flex-col gap-4'>
                <h1 className='text-2xl font-[900]'>{disaster.title}</h1>
                <div>
                    <h2 className='text-xl font-[900]'>Summary</h2>
                    <p>{disaster.description}</p>
                </div>
                <div>
                    <h2 className='text-xl font-[900]'>Affected Area</h2>
                    <p>{disaster.location}</p>
                </div>
                
            </div>
        </div>
    )
}

export default DisasterInfo