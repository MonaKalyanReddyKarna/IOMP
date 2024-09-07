import { Disaster } from '@/types/disaster';
import { getDisasterIcon } from '@/utils/disastericonmapping';
import React from 'react';
import Separator from './Separator';
import { useDisasterStore } from '@/zustand/useDisasterStore';

interface DisasterProps {
    disasterData: Disaster;
}

export function DisasterCard({ disasterData }: DisasterProps) {
    const setSection = useDisasterStore((state) => state.setSection);
    const setSelectedDisaster = useDisasterStore((state) => state.setSelectedDisaster);

    const formatDate = (timestamp: string): string => {
        const date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return date.toLocaleString('en-US', options);
    };

    const handleSectionChange = () => {
        setSection('disasterinfo');
        setSelectedDisaster(disasterData);
    };

    return (
        <div onClick={handleSectionChange} className='w-full py-8 border-b border-b-gray-300 flex flex-col p-4  gap-2 cursor-pointer hover:bg-gray-200'>
            {/* Row 1 */}
            <div className='flex items-end gap-4'>
                <img className='w-12 h-12' src={getDisasterIcon(disasterData.disasterType.toLowerCase())} alt="Icon" />
                <p className='text-[#276fb3] font-[900] underline underline-2 text-2xl'>
                    {disasterData.title}
                </p>
            </div>
            {/* Row 2 */}
            <div className='flex flex-row flex-wrap items-center gap-4'>
                <div className='flex flex-row items-center gap-2'>
                    <h2 className='font-bold'>Status: </h2>
                    <div className='bg-red-500 rounded-full w-4 h-4'></div>
                    <span>Ongoing</span>
                </div>
                <Separator />
                <div className='flex flex-row items-center gap-2'>
                    <h2 className='font-bold'>Disaster Type: </h2>
                    <span className='text-[#276fb3] font-[900] underline underline-2'>{disasterData.disasterType}</span>
                </div>
                <Separator />
                <div className='flex flex-row items-center gap-2'>
                    <h2 className='font-bold'>Affected Area: </h2>
                    <span className='text-[#276fb3] font-[900] underline underline-2'>{disasterData.location}</span>
                </div>
            </div>
        </div>
    );
}

export default DisasterCard;
