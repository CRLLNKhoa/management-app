import AddTasks from '@/components/innerCollectionComponents/AddTasks'
import Header from '@/components/innerCollectionComponents/Header'
import ListTask from '@/components/innerCollectionComponents/ListTask'
import React, { useEffect } from 'react'
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";

function Todo() {
  const mutation = useMutation({
    mutationFn: (projectsDetail) => {
      const res = supabase
        .from("projects")
        .select("*",)
        .eq("id", "4fa10baf-f444-4052-b6d9-d33aa572691e");
      return res;
    },
  });

  const handleGetTask = () => {
    mutation.mutate();
  }

  useEffect(() => {
    handleGetTask()
  }, []);

  const {data,isLoading} = mutation


  if(isLoading){
    return(
      <main className='w-full h-[300px] flex justify-center items-center'>
        <span className="loading loading-ring loading-lg"></span>
     </main>
    )
  }

  return (
    <section className='grid grid-cols-5 w-full pt-8 px-4'>
      <div></div>
        <main className='flex flex-col relative lg:col-span-3 col-span-5 px-4 lg:px-0 w-full gap-4'>
            <Header data={data?.data[0]} />
            <AddTasks id={data?.data[0]?.id} refech={handleGetTask} task={data?.data[0]?.task} />
            <ListTask data={data?.data[0]?.task} />
        </main>
        <main className='col-span-1 pl-8 pr-4'>
          <h1>Recent changes</h1>
          <p>Lương Khoa update at 7:58</p>
          <p>Lương Khoa update at 9:13pm</p>
          <p>Lương Khoa update at 9:35pm</p>
        </main>
    </section>
  )
}

export default Todo