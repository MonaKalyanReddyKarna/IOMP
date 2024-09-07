import { useDisasterStore } from '@/zustand/useDisasterStore'
import { ArrowDownWideNarrow, Filter } from 'lucide-react'
import React from 'react'

const FilterSection = () => {
  const section = useDisasterStore((state) => state.section)
  return (
    <div className='flex flex-row justify-between w-full h-20 rounded-xl'>
      <h1 className='text-3xl font-[900]'>Disasters</h1>
      {section === "disasters" && (
        <div className='flex items-center gap-4'>
          <button className='bg-gray-300 px-4 py-2 rounded-xl flex gap-2'><Filter /> Filter</button>
          <button className='bg-gray-300 px-4 py-2 rounded-xl flex gap-2'><ArrowDownWideNarrow /> Sort</button>
        </div>
      )}
    </div>
  )
}

export default FilterSection