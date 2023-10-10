"use client"
import { DatePickerWithRange } from '@/components/ui/ui/range-picker';
import React from 'react'

export const SearchPage = () => {
  return (

    <div className='flex min-h-screen flex-col justify-self-auto items p-5'>
       <div className='text-xl text-secondary p-10'>
        Search Page
       </div>
    
     <DatePickerWithRange className='text-secondary'/>
     <br/>
    </div>
  

  )
}

export default SearchPage;