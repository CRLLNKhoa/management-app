import AddTasks from '@/components/innerCollectionComponents/AddTasks'
import Header from '@/components/innerCollectionComponents/Header'
import ListTask from '@/components/innerCollectionComponents/ListTask'
import React from 'react'

function Todo() {
  return (
    <section className='grid grid-cols-5 w-full pt-8'>
        <div className='lg:block hidden'></div>
        <main className='flex flex-col relative lg:col-span-3 col-span-5 px-4 lg:px-0 w-full gap-4'>
            <Header />
            <AddTasks />
            <ListTask />
        </main>
    </section>
  )
}

export default Todo