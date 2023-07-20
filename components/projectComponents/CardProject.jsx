/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsChatSquareText } from "react-icons/bs";
import {LuListTree} from "react-icons/lu"
import {HiOutlineUserGroup} from "react-icons/hi"
import Chip from "./Chip";
import Link from "next/link";

function CardProject({data}) {
  return (
    <div className="flex flex-col bg-black col-span-3 md:col-span-2 lg:col-span-1 p-4 rounded-lg">
      {/* Header Card */}
      <div className="flex justify-between items-center">
        <Link href={`/project/${data.id}`} className="truncate mr-4 text-[18px] font-semibold">{data.name}</Link>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            className=" p-1 rounded-lg text-white cursor-pointer"
          >
            <BiDotsVerticalRounded size={20} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Edit Project</a>
            </li>
            <li>
              <a>Delete Project</a>
            </li>
          </ul>
        </div>
      </div>
      {/* Sub Card */}
      <div className="flex text-[14px] flex-wrap items-center gap-2">
        <p>Date: {data.exp}</p>
        <p>-</p>
        <ul className="list-disc truncate">
          <li>Owner: {data.user.name}</li>
        </ul>
      </div>
      {/* Desc Card */}
      <p className="text-sm my-2">
        {data.desc.slice(
          0,
          70
        )}
        ...
      </p>
      {/* Img Card  */}
      {/* <img
        className="rounded-lg"
        src="https://picsum.photos/200/50"
        alt="..."
      /> */}
      {/* Type Card */}
      <div className="flex gap-4 flex-wrap justify-start my-4">
        {data.type.map((item,index) => <Chip color={index} key={index} text={item} />)}
      </div>
      {/* Card footer */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
            <span className="flex items-center gap-2"><BsChatSquareText/> {data?.comments?.length || 0}</span>
            <span className="flex items-center gap-2"><LuListTree /> {data?.task?.length || 0}</span>
        </div>
        <span className="flex items-center gap-2"><HiOutlineUserGroup /> {data?.menbers?.length || 0}</span>
      </div>
    </div>
  );
}

export default CardProject;
