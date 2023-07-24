import React, { useContext, useEffect, useRef, useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { LuListTree, LuCalendar } from "react-icons/lu";
import { AiFillDelete } from "react-icons/ai";
import { Project } from "@/pages/project/[id]";

function ItemTask({ data,delItem,index,list}) {
  const [show, setShow] = useState(false);
  const [complete, setComplete] = useState(data?.isComplete);
  const [select, setselect] = useState(false);
  const [showDel, setshowDel] = useState(false)
  const [dataUpdate, setdataUpdate] = useState(list)
  const [dataTask, setdataTask] = useState(data)
  const {project,setProject} = useContext(Project)

const handleUpdate = (index,status) => {
  const newArray = project?.task?.map((item, i) => {
    if (index === i) {
      return { ...item, isComplete: status}
    } else {
      return item
    }
  })
  setProject({...project,task: newArray})
};

  return (
    <section
      onClick={() => setselect(!select)}
      className={`${
        select ? "bg-slate-900" : "bg-slate-700"
      } overflow-hidden cursor-pointer relative px-2 py-4 rounded-lg duration-500 flex flex-col gap-2`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          defaultChecked={data?.isComplete}
          className="checkbox checkbox-error"
          onChange={(e) => {setComplete(e.target.checked);handleUpdate(index,e.target.checked)}}
        />
        <h2 className={`text-white select-none ${complete && "line-through"} `}>
          {data?.name}
        </h2>
        {data?.todo?.length !== 0 && (
          <button
            onClick={() => setShow(!show)}
            className="ml-auto bg-slate-500 text-white rounded-lg"
          >
            {show ? <BiChevronUp size={24} /> : <BiChevronDown size={24} />}
          </button>
        )}
      </div>
      {(data?.todo.length > 0 || data?.exp) && (
        <div className="flex gap-8 items-center select-none">
          {data?.todo.length > 0 && (
            <span className="flex items-center gap-2">
              <LuListTree size={20} />
              {data?.todo?.length || 0}
            </span>
          )}
          {data?.exp && (
            <span className="flex items-center gap-2 text-success">
              <LuCalendar size={15} />
              {data?.exp}
            </span>
          )}
        </div>
      )}
      {show && (
        <div className="flex flex-col gap-2 pl-8">
          <ol className="list-decimal ml-8">
            {data?.todo?.map((item, index) => (
              <li key={index} className="text-white select-none">
                {item}
              </li>
            ))}
          </ol>
        </div>
      )}

      {select && (
        <div onClick={()=> setshowDel(!showDel)} className="absolute hover:text-red-600 duration-500 bottom-0 right-0 bg-black w-6 h-6 flex justify-center items-center rounded-tl-lg">
          <AiFillDelete size={15} />
        </div>
      )}

      <div className={`absolute select-none top-0 bottom-0 flex justify-center gap-4 items-center right-0 ${showDel ?"left-[0] opacity-100" :"left-[150%] opacity-0"} bg-black rounded-lg transition-all`}>
        <p>Confirm delete!</p>
        <button onClick={()=> delItem(index)} className="bg-error text-white px-4 hover:scale-105 duration-500 rounded-sm">Delete</button>
        <button onClick={()=> setshowDel(false)} className="bg-info text-white px-4 hover:scale-105 duration-500 rounded-sm">Cancel</button>
      </div>
    </section>
  );
}

export default ItemTask;
