import { Disaster } from '@/types/disaster';
import React from 'react';
import FilterSection from './Header';
import DisasterCard from './DisasterCard';

interface DisastersProps {
    disasters: Disaster[];
}

export function Disasters({ disasters }: DisastersProps) {
    return (
        <div className='flex flex-col items-center space-y-4 p-4'>
            <FilterSection />
            {disasters.map((disaster) => (
                <DisasterCard disasterData={disaster} />
            ))}
        </div>
    );
}

export default Disasters;
