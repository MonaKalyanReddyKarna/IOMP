import { useDisasterStore } from '@/zustand/useDisasterStore'
import React from 'react'
function parseNewlines(jsonString: string): { [key: string]: any } {
    const data = JSON.parse(jsonString);

    for (let key in data) {
        if (typeof data[key] === 'string') {
            data[key] = data[key].replace(/\\n/g, '\n');
        }
    }

    return data;
}
const Description = () => {
    const disaster = useDisasterStore((state) => state.selectedDisaster)

    const parsedDisaster = parseNewlines(JSON.stringify(disaster));

    return (
        <div className='px-4 py-4 max-w-[80%]'>
            <h2 className='text-3xl text-[#276fb3] font-[900]'>Disaster Description</h2>
            <p className='text-xl py-4'>{parsedDisaster.description}</p>
        </div>
    )
}

export default Description