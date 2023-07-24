import React, { useContext, useEffect } from "react";
import ItemTask from "./ItemTask";
import { useMutation } from "@tanstack/react-query";
import { Project } from "@/pages/project/[id]";
import { toast } from "react-toastify";
import { supabase } from "@/supabaseClient";

function ListTask({ data, delItem }) {
  const { project } = useContext(Project);

  const mutationUpdate = useMutation({
    mutationFn: (data) => {
      const res = supabase
        .from("projects")
        .update({ task: project?.task })
        .eq("id", project.id)
        .select();
      return res;
    },
  });

  const {data: dataUpdate, isLoading} = mutationUpdate

  useEffect(() => {
   if(dataUpdate){
    toast.success("Update success!")
   }
  }, [dataUpdate]);

  return (
    <section>
      <h1 className="text-[18px] text-white">Task - {data?.length || 0}</h1>
      <div className="mt-4 flex flex-col gap-4">
        {project?.task
          ?.map((item, index) => ({ ...item, index }))
          .filter((item) => item.isComplete === false)
          .map(({ index, ...item }) => (
            <ItemTask
              list={data}
              index={index}
              delItem={delItem}
              key={index}
              data={item}
            />
          ))}
      </div>
      {data?.filter((item) => item.isComplete === true)?.length === data?.length && (
        <div className="flex justify-center">
          <p>Completed all tasks!</p>
        </div>
      )}
      <h1 className="text-[18px] text-white mt-8">
        Completed - {data?.filter((item) => item.isComplete === true)?.length || 0}
      </h1>
      <div className="mt-4 flex flex-col gap-4">
        {project?.task
          ?.map((item, index) => ({ ...item, index }))
          .filter((item) => item.isComplete === true)
          .map(({ index, ...item }) => (
            <ItemTask
              list={data}
              index={index}
              delItem={delItem}
              key={index}
              data={item}
            />
          ))}
      </div>
      <div className="flex">
        <button
          onClick={() => mutationUpdate.mutate()}
          disabled={project === []}
          className={`${
            project !== [] ? "bg-info" : "bg-black"
          } text-white flex gap-2 items-center duration-500 hover:bg-red-500 px-8 py-1 rounded-lg mt-8 ml-auto`}
        >
          {isLoading &&  <span className="loading loading-infinity loading-md"></span>}
          {isLoading ? "Updating..." : "Save"}
        </button>
      </div>
    </section>
  );
}

export default ListTask;
