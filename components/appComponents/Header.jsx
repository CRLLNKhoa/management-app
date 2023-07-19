/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { RiDashboardFill, RiFolderFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { LuBellRing } from "react-icons/lu";
import Link from "next/link";
import { Auth } from "@/contexts/authContext";


function Header() {
  const [time, settime] = useState()
  const {auth,setAuth} = useContext(Auth)
  useEffect(() => {
    settime(new Date().toLocaleString())
    setAuth(JSON.parse(localStorage.getItem("uuid")))
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("uuid")
    setAuth(null)
  }
  return (
    <header className="px-4 z-50 sticky top-0 select-none py-4 bg-[#20233F] flex justify-between items-center">
      <div className="flex gap-8">
          <p>{time}</p>
      </div>
      <div className="flex gap-4 items-center">
        <button className="bg-error text-white px-2  py-2 rounded-lg font-bold duration-500 hover:brightness-125">
          <MdAdd size={16} />
        </button>
        <button className="hover:bg-slate-600 duration-500 px-2 py-2 rounded-lg">
          <BiSearch size={16} />
        </button>
        <button className="hover:bg-slate-600 duration-500 px-2 py-2 rounded-lg">
          <LuBellRing size={16} />
        </button>
        {auth !== null ? <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} className="flex w-[42px] cursor-pointer h-[42px] bg-error justify-center rounded-full items-center">
            <p className="text-white font-bold text-[18px] uppercase">{auth?.email?.slice(0,1)}</p>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <p onClick={handleLogout}>Logout</p>
            </li>
          </ul>
        </div> : <Link href="/login">Đăng nhập</Link>}
      </div>
    </header>
  );
}

export default Header;
