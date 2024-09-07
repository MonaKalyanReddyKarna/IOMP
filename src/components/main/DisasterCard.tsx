import { Disaster } from '@/types/disaster';
import { getDisasterIcon } from '@/utils/disastericonmapping';
import React from 'react';
import Separator from './Separator';

interface DisasterProps {
    disasterData: Disaster;
}

function formatDate(timestamp: string): string {
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
}

export function DisasterCard({ disasterData }: DisasterProps) {
    return (
        <div key={disasterData._id} className='w-full h-32 border-b border-b-gray-300 flex flex-col p-4 gap-2'>
            {/* Row 1 */}
            <div className='flex items-end gap-4'>
                <img className='w-12 h-12' src={getDisasterIcon(disasterData.disasterType.toLowerCase())} alt="Icon" />
                <p className='text-[#055372] font-[900] underline underline-2 text-2xl'>
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
                    <div className='flex flex-row items-center gap-2'>
                        <h2 className='font-bold'>Disaster Type: </h2>
                        <span className='text-[#055372] font-[900] underline underline-2'>{disasterData.disasterType}</span>
                    </div>
                </div>
                <Separator />
                <div className='flex flex-row items-center gap-2'>
                    <div className='flex flex-row items-center gap-2'>
                        <h2 className='font-bold'>Affected Area: </h2>
                        <span className='text-[#055372] font-[900] underline underline-2'>{disasterData.location}</span>
                    </div>
                </div>
            </div>
            {/* <h2 className=''>{formatDate(disasterData.timestamp)}</h2> */}
        </div>
    );
}

export default DisasterCard;
