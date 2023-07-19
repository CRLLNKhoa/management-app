import Link from 'next/link'
import React from 'react'
import { RiDashboardFill, RiFolderFill } from "react-icons/ri";

function Sidebar() {
  return (
    <section className='lg:flex hidden flex-col'>
        <div className='flex gap-2 p-4'>
            <div className='w-3 h-3 bg-red-600 rounded-full'></div>
            <div className='w-3 h-3 bg-warning rounded-full'></div>
            <div className='w-3 h-3 bg-green-600 rounded-full'></div>
        </div>
        <h1 className='mt-8 font-bold pt-4 pl-4 pr-4'>Menu</h1>
        <div className='w-full flex flex-col mt-2'>
          <Link href="/s" className='flex p-4 items-center gap-2 hover:bg-slate-700 duration-500'>
            <div className='bg-slate-700 px-2 py-2 text-white rounded-lg'><RiDashboardFill /></div>
            Dashboard
          </Link>
          <Link href="/s" className='flex p-4 items-center gap-2 hover:bg-slate-700 duration-500'>
            <div className='bg-slate-700 px-2 py-2 text-white rounded-lg'><RiFolderFill /></div>
            Projects
          </Link>
        </div>
        <h1 className='mt-8 font-bold pt-4 pl-4 pr-4'>My Team</h1>
    </section>
  )
}

export default Sidebar