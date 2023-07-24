import React from 'react'

function Menber() {
  return (
    <div>
        <h1>List Member</h1>
        <h3 className='mt-4 mb-2'>----Owner----</h3>
        <p className='text-error'>- Lương Khoa</p>
        <h3 className='mt-4 mb-2'>----Editer----</h3>
        <ul className=''>
            <li className='text-info'>- Tester 1</li>
            <li className='text-info'>- Tester 2</li>
            <li className='text-info'>- Tester 3</li>
        </ul>
        <h3 className='mt-4 mb-2'>----Member----</h3>
        <ul className=''>
            <li className='text-success'>- Member 1</li>
            <li className='text-success'>- Member 2</li>
            <li className='text-success'>- Member 3</li>
        </ul>
    </div>
  )
}

export default Menber