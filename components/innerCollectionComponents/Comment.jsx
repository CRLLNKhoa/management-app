import React from 'react'

function Comment() {
  return (
    <div>
        <h1 className='mb-4'>Notication</h1>
        <ol className="list-decimal text-[13px] ml-3">
            <li>Report at the weeken</li>
            <li>Commit github 2times/day</li>
            <li>Write text coded</li>
        </ol>
        <button className='btn btn-sm btn-secondary mt-4'>Add notication</button>
    </div>
  )
}

export default Comment