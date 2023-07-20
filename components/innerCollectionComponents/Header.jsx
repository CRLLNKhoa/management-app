import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";

function Header({data}) {

  return (
    <section className="flex select-none items-center justify-between gap-8">
      <button className="text-white bg-slate-600 cursor-pointer px-2 py-2 hover:scale-110 rounded-lg duration-500">
        <IoIosArrowBack />
      </button>
      <h1 className="font-semibold text-[18px] text-white mr-auto">{data?.name}</h1>
      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          className="text-white bg-slate-600 cursor-pointer px-2 py-2 hover:scale-110 rounded-lg duration-500"
        >
          <BiDotsVerticalRounded />
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-lg w-52"
        >
          <li>
            <a>Edit Project</a>
          </li>
          <li className="text-red-600 hover:text-red-600">
            <p>Delete Project</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Header;
