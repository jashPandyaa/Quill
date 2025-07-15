import React from 'react'
import { footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px16 lg:px-24 xl:px-32 bg-primary/3'> 
        <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src="/favicon.svg" alt="Quill Logo" className="w-10 h-10" />
                    <h1 className='text-3xl font-semibold text-black'>Quill</h1>
                </div>
                <p className='max-w-[410px] mt-6'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati culpa unde delectus nulla repudiandae itaque, deserunt pariatur optio in molestias nostrum tenetur, exercitationem autem atque reprehenderit saepe at a suscipit.</p>
            </div>

            <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
                {footer_data.map((section , index) => ( //issue resolved 
                    <div key={index}>
                        <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2 '>
                             {section.title} </h3>
                        <ul className='text-sm space-y-1'>
                            {section.links.map((link,i) => (
                                <li key={i}>
                                    <a href="#" className='hover:underline transition'>{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

        </div>
        <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>
            Copyright 2025 © Quill "Where Words Find Wings" - <b className='font-semibold'> All Rights Reserved.</b></p>
    </div>
  )
}

export default Footer
