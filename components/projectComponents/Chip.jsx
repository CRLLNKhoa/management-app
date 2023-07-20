import React from 'react'

function Chip({text,color}) {
    const bg = ["bg-success","bg-error","bg-info","bg-primary","bg-warning"]
  return (
    <div className={`flex select-none justify-center items-center ${bg[color]} text-white px-4 rounded-full`}>
        <p>{text}</p>
    </div>
  )
}

export default Chip