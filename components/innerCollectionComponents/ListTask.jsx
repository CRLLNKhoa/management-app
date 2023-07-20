import React from "react";
import ItemTask from "./ItemTask";

function ListTask({data}) {
  return (
    <section>
      <h1 className="text-[18px] text-white">Task - {data?.length || 0}</h1>
      <div className="mt-4 flex flex-col gap-4">
        {data?.filter(item => item.isComplete === false).map((item,index)=> <ItemTask key={index} data={item} />)}
      </div>
      <h1 className="text-[18px] text-white mt-8">Completed - {data?.filter(item => item.isComplete === true)?.length}</h1>
      <div className="mt-4">
      {data?.filter(item => item.isComplete === true).map((item,index)=> <ItemTask key={index} data={item} />)}
      </div>
      <div className="flex">
        <button className="bg-info text-white flex gap-2 items-center duration-500 hover:bg-red-500 px-8 py-1 rounded-lg mt-8 ml-auto">
        <span className="loading loading-infinity loading-md"></span>
          Save
        </button>
      </div>
    </section>
  );
}

export default ListTask;
