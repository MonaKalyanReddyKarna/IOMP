"use client"
import React, { useState } from 'react'
import { data } from "@/data/dummy"
import Disasters from './Disasters'

const Hero = () => {
    return (
        <div className='p-2 h-full overflow-y-auto'>
            <Disasters disasters={data} />
        </div>
    )
}

export default Hero