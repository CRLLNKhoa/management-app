import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import {RiCloseLine} from "react-icons/ri"

function AddTasks({id,refech,task=[]}) {
  const [show, setShow] = useState(false);
  const [list, setlist] = useState(true)

  const [step, setStep] = useState(1);
  const inputRef = useRef();

  const [newTask, setnewTask] = useState({
    "name": "",
    "todo": [],
    "exp": "",
    "isComplete": false
  });

  const handleEnter = () => {
    switch (step) {
      case 1:
        setnewTask({ ...newTask, "name": inputRef.current.value });
        setStep(2);
        inputRef.current.value = "";
        break;
      case 2:
        if (inputRef.current.value === "N" || inputRef.current.value === "n") {
          setStep(5);
          setlist(false)
          inputRef.current.value = "";
          break;
        }
        if (inputRef.current.value === "Y" || inputRef.current.value === "y") {
          setStep(4);
          setlist(true)
          inputRef.current.value = "";
          break;
        }
        
      case 4:
        if (inputRef.current.value === "y" || inputRef.current.value === "Y") {
          setStep(5);
          inputRef.current.value = "";
          break;
        }
        setnewTask({
          ...newTask,
          "todo": [...newTask.todo, inputRef.current.value],
        });
        inputRef.current.value = "";
        break;
      case 5:
        if(inputRef.current.value === "N" || inputRef.current.value === "n"){
          setStep(9)
          inputRef.current.value = "";
          break;
        }
        setnewTask({...newTask, "exp": inputRef.current.value})
        inputRef.current.value = "";
        setStep(9)
        break;
      case 9: 
      if(inputRef.current.value === "N" || inputRef.current.value === "n"){
        setStep(1)
        inputRef.current.value = "";
        setnewTask({
          "name": "",
          "todo": [],
          "exp": "",
          "isComplete": false
        })
        break;
      }
      if(inputRef.current.value === "Y" || inputRef.current.value === "y"){
        inputRef.current.value = "";
        mutation.mutate()
        setShow(false)
        break;
      }
      default:
        break;
    }
  };
console.log(task)
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleEnter()
  }}

  const mutation = useMutation({
    mutationFn: (datasss) => {
      const res = supabase
      .from('projects')
      .update({ task: [...task,newTask] })
      .eq("id", id)
      .select()   
      return res;
    },
  });

  const {data} = mutation

  useEffect(() => {
    if(data?.data !== data){
      setnewTask({
        "name": "",
        "todo": [],
        "exp": "",
        "isComplete": false
      })
      refech()
    }
  }, [data]);

  return (
    <section className="flex flex-col relative duration-500">
      <button
        onClick={() => setShow(!show)}
        className="flex items-center select-none gap-2 hover:text-white bg-[#21212B] hover:border-[#21212B] duration-500 px-2 py-3 rounded-lg"
      >
        <div className="bg-error p-1 text-white rounded-lg text-[20px]">
          <HiOutlinePlusSm />
        </div>
        Add a task
      </button>

      <section
      onKeyDown={handleKeyDown}
        className={`delay-1000 z-40 absolute w-full px-4 py-8 rounded-lg top-[110%] bg-black ${
          show ? "flex opacity-100" : "hidden"
        } opacity-0 flex-col`}
      >
        {step >= 1 && <h2>Enter a new task name!</h2>}
        <p>- Name task: {newTask.name}</p>
        {step >= 2 && <h2>Add todo? (Y/N)</h2>}
        {(step > 3 && list)  && <h2>Enter name todo!</h2>}
        {!list && <h2>- Not todo</h2>}
        {(step > 3 && list) && <h2>- List todo: (Y: complete)</h2>}
        {(step >= 4 && list) && (
          <ol className="list-decimal ml-12">
            {newTask.todo.map((item, index) => 
              <li key={index}>{item}</li>
            )}
          </ol>
        )}
        {step >= 5 && <h2>Enter exp! (N: Skip) {newTask.exp}</h2>}
        {step >= 9 && <h2>Create task? (Y/N)</h2>}
        {step >= 10 && <h2>Creating...</h2>}
        <div className="flex gap-4 mt-4 w-full">
          <input
            ref={inputRef}
            className="flex-1 outline-none px-4 rounded-sm"
            type="text"
          />
          <button onClick={handleEnter}>Enter</button>
        </div>
          <div onClick={()=> setShow(!show)} className="absolute cursor-pointer text-black hover:scale-110 duration-500 top-4 right-4 bg-white w-6 h-6 rounded-full flex justify-center items-center">
              <RiCloseLine />
          </div>
      </section>

    </section>
  );
}

export default AddTasks;
