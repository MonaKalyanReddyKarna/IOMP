import { useDisasterStore } from '@/zustand/useDisasterStore'
import React from 'react'

const Description = () => {
    const disaster = useDisasterStore((state) => state.selectedDisaster)
    return (
        <div className='px-4 py-4 max-w-[80%]'>
            <h2 className='text-3xl text-[#276fb3] font-[900]'>Disaster Description</h2>
            <p className='text-xl py-4'>{disaster.description}</p>
        </div>
    )
}

export default Description