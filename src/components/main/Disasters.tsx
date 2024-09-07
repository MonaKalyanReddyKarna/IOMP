import { Disaster } from '@/types/disaster';
import React from 'react';
import FilterSection from './Header';
import DisasterCard from './DisasterCard';
import { useDisasterStore } from '@/zustand/useDisasterStore';
import DisasterInfo from './DisasterInfo'; // Ensure this import is correct

interface DisastersProps {
    disasters: Disaster[];
}

export function Disasters({ disasters }: DisastersProps) {
    const section = useDisasterStore((state) => state.section);

    return (
        <div className='flex flex-col items-center space-y-4 p-4'>
            <FilterSection />
            {section === "disasters" ? (
                disasters.map((disaster) => (
                    <DisasterCard key={disaster._id} disasterData={disaster} />
                ))
            ) : section === "disasterinfo" ? (
                <DisasterInfo />
            ) : null}
        </div>
    );
}

export default Disasters;
