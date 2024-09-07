import React from 'react'
import { configurations } from '@/data/configurations'
import ConfigBox from './ConfigBox'

const Configurations = () => {

    return (
        <div className='flex flex-wrap items-center justify-center px-8 py-4 gap-10'>
            {configurations.map((configuration, index) => (
                <ConfigBox key={index} configuration={configuration} />
            ))}
        </div>
    )
}

export default Configurations