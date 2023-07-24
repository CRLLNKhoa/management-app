/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { RiDashboardFill, RiFolderFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { LuBellRing } from "react-icons/lu";
import Link from "next/link";
import { TbMoodSearch } from "react-icons/tb";
import { Auth } from "@/contexts/authContext";
import { supabase } from "@/supabaseClient";
import { useMutation } from "@tanstack/react-query";
import { ProjectContext } from "@/pages/_app";
import { useRouter } from "next/router";

function Header() {
  const [time, settime] = useState();
  const { auth, setAuth } = useContext(Auth);
  const [dataCreate, setdataCreate] = useState({
    menbers: [],
    name: "",
    desc: "",
    exp: "",
    type: [],
    owner: auth?.id,
    task: []
  });

  useEffect(() => {
    setdataCreate({ ...dataCreate, owner: auth?.id });
  }, [auth]);

  useEffect(() => {
    settime(new Date().toLocaleString());
    setAuth(JSON.parse(localStorage.getItem("uuid")));
  }, []);
const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem("uuid");
    setAuth(null);
    router.push("/login")
  };

  const [user, setuser] = useState([]);
  const [inputSearch, setinputSearch] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    let { data: user, error } = await supabase
      .from("user")
      .select("id,name,email")
      .eq("name", inputSearch);
    setuser(user);
  };

  const handleAddMember = (data) => {
    if (dataCreate.menbers.filter((item) => item?.id === data?.id).length > 0) {
      setdataCreate(dataCreate);
    } else {
      setdataCreate({
        ...dataCreate,
        menbers: [
          ...dataCreate.menbers,
          { id: data?.id, name: data?.name, email: data?.email },
        ],
      });
    }
  };

  const handleRemoveMember = (id) => {
    const newArr = dataCreate.menbers.filter((item) => item?.id !== id);
    setdataCreate({ ...dataCreate, menbers: newArr });
  };

  const [inputType, setinputType] = useState("");
  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return supabase
        .from("projects")
        .insert([dataCreate])
        .select("*,user(name)");
    },
  });

  const handleCreateProject = () => {
    mutation.mutate();
  };

  const { listProject, setlistProject } = useContext(ProjectContext);
  useEffect(() => {
    if (mutation?.data?.data?.length > 0) {
      setlistProject([...listProject, mutation?.data?.data[0]]);
      setdataCreate({
        menbers: [],
        name: "",
        desc: "",
        exp: "",
        type: [],
        owner: auth?.id,
        task: []
      })
    }
  }, [mutation?.data?.data]);

  return (
    <>
      <header className="px-4 z-50 sticky top-0 select-none py-4 bg-[#20233F] flex justify-between items-center">
        <div className="flex gap-8">
          <p>{time}</p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => window.my_modal_4.showModal()}
            className="bg-error text-white px-2  py-2 rounded-lg font-bold duration-500 hover:brightness-125"
          >
            <MdAdd size={16} />
          </button>
          <button className="hover:bg-slate-600 duration-500 px-2 py-2 rounded-lg">
            <BiSearch size={16} />
          </button>
          <button className="hover:bg-slate-600 duration-500 px-2 py-2 rounded-lg">
            <LuBellRing size={16} />
          </button>
          {auth !== null ? (
            <div className="dropdown dropdown-bottom dropdown-end">
              <div
                tabIndex={0}
                className="flex w-[42px] cursor-pointer h-[42px] bg-error justify-center rounded-full items-center"
              >
                <p className="text-white font-bold text-[18px] uppercase">
                  {auth?.email?.slice(0, 1)}
                </p>
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
            </div>
          ) : (
            <Link href="/login">Đăng nhập</Link>
          )}
        </div>
      </header>

      <dialog id="my_modal_4" className="modal">
        <form method="dialog" className="modal-box w-1/2 max-w-5xl">
          <h3 className="font-bold text-lg border-b-2 pb-2">
            Create new project!
          </h3>
          <div className="flex flex-col py-6">
            <h1>Name project</h1>
            <input
              type="text"
              className="mb-2 outline-none rounded-lg pl-4 py-1"
              value={dataCreate.name}
              onChange={(e) =>
                setdataCreate({ ...dataCreate, name: e.target.value })
              }
            />
            <h1>Description project</h1>
            <input
              type="text"
              className="mb-2 outline-none rounded-lg pl-4 py-1"
              value={dataCreate.desc}
              onChange={(e) =>
                setdataCreate({ ...dataCreate, desc: e.target.value })
              }
            />
            <h1>Date</h1>
            <input
              type="text"
              className="mb-2 outline-none rounded-lg pl-4 py-1"
              value={dataCreate.exp}
              onChange={(e) =>
                setdataCreate({ ...dataCreate, exp: e.target.value })
              }
            />
            <h1>Type</h1>
            <div className="flex gap-2 items-center p-2">
              <div className="flex gap-2 rounded-lg flex-1">
                {dataCreate?.type?.map((item, index) => {
                  if (index < 3) {
                    return <span key={item}>{item}</span>;
                  }
                })}
              </div>
              <input
                type="text"
                className="mb-2 outline-none rounded-lg pl-4 py-1"
                value={inputType}
                onChange={(e) => setinputType(e.target.value)}
              />{" "}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setdataCreate({
                    ...dataCreate,
                    type: [...dataCreate.type, inputType],
                  });
                  setinputType("")
                }}
                className="px-2 py-1"
              >
                Add
              </button>
            </div>
            <h1>Member</h1>
            <div className="grid grid-cols-3 gap-2 py-1">
              {dataCreate?.menbers.map((item) => {
                return (
                  <div
                    onClick={() => handleRemoveMember(item.id)}
                    key={item.id}
                    className="flex cursor-pointer hover:scale-105 duration-500 items-center gap-2 bg-black px-2 py-1 rounded-lg"
                  >
                    <div className="flex justify-center items-center min-w-[32px] min-h-8 bg-emerald-700 rounded-full text-white font-[18px]">
                      <p className="uppercase">{item?.name.slice(0, 1)}</p>
                    </div>
                    <div className="flex flex-1 truncate flex-col">
                      <p className="truncate text-white">{item.name}</p>
                      <p className="text-[13px] truncate">{item.email}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-2 mt-2 items-center">
              <input
                type="text"
                className="flex-1 outline-none rounded-lg pl-4 py-1"
                value={inputSearch}
                onChange={(e) => setinputSearch(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="bg-info w-8 h-8 rounded-lg hover:scale-110 text-white flex justify-center items-center "
              >
                <TbMoodSearch />
              </button>
            </div>
            {user?.length > 0 && (
              <div className="grid grid-cols-3 bg-black gap-2 mt-2 px-2 py-2">
                {user?.map((item) => {
                  return (
                    <div
                      onClick={() => handleAddMember(item)}
                      key={item.id}
                      className="flex cursor-pointer hover:scale-105 duration-500 items-center gap-2 bg-slate-600 px-2 py-1 rounded-lg"
                    >
                      <div className="flex justify-center items-center min-w-[32px] min-h-8 bg-emerald-700 rounded-full text-white font-[18px]">
                        <p className="uppercase">{item.name.slice(0, 1)}</p>
                      </div>
                      <div className="flex flex-1 truncate flex-col">
                        <p className="truncate text-white">{item.name}</p>
                        <p className="text-[13px] truncate">{item.email}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="modal-action gap-4">
            {/* if there is a button, it will close the modal */}
            <button className="btn btn-sm">Close</button>
            <button
              onClick={handleCreateProject}
              className="btn btn-sm btn-error"
            >
              Create
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default Header;
