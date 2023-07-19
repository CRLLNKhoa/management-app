import React from "react";
import ItemTask from "./ItemTask";

function ListTask() {
  return (
    <section>
      <h1 className="text-[18px] text-white">Task - 8</h1>
      <div className="mt-4 flex flex-col gap-4">
        <ItemTask />
        <ItemTask />
        <ItemTask />
        <ItemTask />
      </div>
      <h1 className="text-[18px] text-white mt-8">Completed - 2</h1>
      <div className="mt-4">
        <ItemTask />
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
