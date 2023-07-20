import React, { useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { LuListTree, LuCalendar } from "react-icons/lu";

function ItemTask({ data }) {
  const [show, setShow] = useState(false);


  return (
    <section className="bg-slate-700 lg:hover:translate-x-2 lg:hover:translate-y-1 px-2 py-4 rounded-lg duration-500 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input type="checkbox" defaultChecked={data?.isComplete} className="checkbox checkbox-error" />
        <h2
          className={`text-white select-none ${
            data?.isComplete && "line-through"
          } `}
        >
          {data?.name}
        </h2>
        <button
          onClick={() => setShow(!show)}
          className="ml-auto bg-slate-500 text-white rounded-lg"
        >
          {show ? <BiChevronUp size={24} /> : <BiChevronDown size={24} />}
        </button>
      </div>
      <div className="flex gap-8 items-center select-none">
        <span className="flex items-center gap-2">
          <LuListTree size={20} />
          {data?.todo?.length || 0}
        </span>
        <span className="flex items-center gap-2 text-success">
          <LuCalendar size={15} />
          {data?.exp}
        </span>
      </div>
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
    </section>
  );
}

export default ItemTask;
