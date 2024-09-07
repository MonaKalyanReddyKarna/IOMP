import { useDisasterStore } from '@/zustand/useDisasterStore';
import { ArrowLeft, FileText } from 'lucide-react';
import React from 'react';

const DisasterInfo = () => {
    const disaster = useDisasterStore((state) => state.selectedDisaster);
    const setSection = useDisasterStore((state) => state.setSection);

    return (
        <div className='flex flex-col w-full h-full bg-gray-100 rounded-lg shadow-lg px-4'>
            <button
                className='flex items-center gap-2 mb-4 text-[#276fb3] hover:text-blue-800 transition-colors duration-200'
                onClick={() => setSection("disasters")}
            >
                <ArrowLeft size={25} />
                Back to Disasters
            </button>
            <div className='flex flex-col gap-6'>
                <h1 className='text-[#276fb3] font-[900] underline underline-2 text-2xl'>{disaster.title}</h1>
                <div className='bg-white p-4 rounded-lg shadow-sm'>
                    <h2 className='text-2xl font-bold text-gray-700 '>Disaster Description</h2>
                    <p className='text-gray-600 mt-2'>{disaster.description}</p>
                </div>
                <div className='bg-white p-4 rounded-lg shadow-sm'>
                    <h2 className='text-2xl font-bold text-gray-700'>Affected Area</h2>
                    <p className='text-gray-600 mt-2'>{disaster.location}</p>
                </div>
                <div className='bg-white p-4 rounded-lg shadow-sm'>
                    <h2 className='text-2xl font-bold text-gray-700'>Status</h2>
                    <p className='text-gray-600 mt-2'>{"Ongoing" || 'Status not available'}</p>
                </div>
                <div>
                    <button
                        className='px-6 py-3 flex gap-2 items-center bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200'
                    >
                        <FileText />
                        View Detailed Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisasterInfo;
