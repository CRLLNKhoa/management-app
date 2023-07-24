import AddTasks from "@/components/innerCollectionComponents/AddTasks";
import Header from "@/components/innerCollectionComponents/Header";
import ListTask from "@/components/innerCollectionComponents/ListTask";
import React, { createContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import Change from "@/components/innerCollectionComponents/Change";
import Comment from "@/components/innerCollectionComponents/Comment";
import Menber from "@/components/innerCollectionComponents/Menber";
import { useRouter } from "next/router";
export const Project= createContext(null);

Todo.getInitialProps = async ({ query }) => {
  const {id} = query

  return {id}
}

function Todo({id}) {
  const [project, setProject] = useState([]);
  const mutation = useMutation({
    mutationFn: (projectsDetail) => {
      const res = supabase
        .from("projects")
        .select("*")
        .eq("id", id);
      return res;
    },
  });

  const { data, isLoading } = mutation;

  const handleGetTask = async () => {
    mutation.mutate();
  };

  useEffect(() => {
    handleGetTask();
  }, []);

  useEffect(() => {
    setProject(data?.data[0]);
  }, [data]);


  if (isLoading) {
    return (
      <main className="w-full h-[300px] flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </main>
    );
  }

  const handleDel = (index) => {
    let list = project.task;
    list.splice(index, 1);
    setProject({ ...project, task: list });
  };

  return (
    <Project.Provider value={{ project, setProject }}>
    <section className="grid grid-cols-5 w-full pt-8 px-4">
      <main>
        {/* <Menber /> */}
      </main>
      <main className="flex flex-col relative lg:col-span-3 col-span-5 px-4 lg:px-0 w-full gap-4">
        <Header data={project} />
        <AddTasks
          id={project?.id}
          refech={handleGetTask}
          task={project?.task}
        />
        <ListTask delItem={handleDel} update={setProject} project={project} data={project?.task} />
      </main>
      <main className="col-span-1 pl-8 pr-4 flex flex-col gap-8">
        {/* <Change />
        <Comment /> */}
      </main>
    </section>
    </Project.Provider>
  );
}

export default Todo;
