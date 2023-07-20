import React from "react";
import {AiFillCaretDown} from "react-icons/ai"

function Header() {
  return (
    <div className="flex justify-end border-b border-slate-500 pb-4">
      <div className="flex flex-col bg-black px-4 py-1 rounded-lg">
        <h4>Sort</h4>
        <div className="flex">
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="flex gap-8 font-bold items-center">
              Create at: ASC
              <AiFillCaretDown/>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
            >
              <li>
                <a>Create at: ASC</a>
              </li>
              <li>
                <a>Create at DESC</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
