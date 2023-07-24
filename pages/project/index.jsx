import CardProject from "@/components/projectComponents/CardProject";
import Header from "@/components/projectComponents/Header";
import React, { useContext, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import { ProjectContext } from "../_app";

function Projects() {
  const {listProject,setlistProject} = useContext(ProjectContext) 
  const mutation = useMutation({
    mutationFn: (projects) => {
      const res = supabase
        .from("projects")
        .select("*,user(name)",)
        .eq("owner", "4fa10baf-f444-4052-b6d9-d33aa572691e");
      return res;
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  const { data, isLoading } = mutation;

  useEffect(() => {
      setlistProject(data?.data)
  }, [data]);

  if (isLoading) {
    return (
      <main className="p-4">
        <Header />
        <h1 className="text-[18px] font-bold mt-4">My Project</h1>
        <div className="w-full flex justify-center items-center min-h-[300px]"><span className="loading loading-ring loading-lg"></span></div>
      </main>
    );
  }

  return (
    <main className="p-4">
      <Header />
      <h1 className="text-[18px] font-bold mt-4">My Project</h1>
      <section className="grid grid-cols-3 gap-4 mt-4">
        {listProject?.map((item) => (
          <CardProject key={item.id} data={item} />
        ))}
      </section>
    </main>
  );
}

export default Projects;
