import React from "react";

function Change() {
  return (
    <div>
      <h1 className="mb-4">Recent changes</h1>
      <ol className="list-disc text-[13px]">
        <li>Lương Khoa <span className="text-warning">update at</span> <span className="text-success">7:58 pm</span></li>
        <li>Lương Khoa <span className="text-error">Delete task: Code base layout grid</span> <span className="text-success">9:13 pm</span></li>
        <li>Lương Khoa <span className="text-info">created task: test\</span> <span className="text-success">9:35 pm</span></li>
      </ol>
    </div>
  );
}

export default Change;
