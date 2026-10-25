import React from 'react'

export const Navigation = () => {
  return (
    <nav>
      <div className='text-sofwhite px-10 bg-transparent absolute top-0 left-0 right-0 py-5 flex justify-between items-center font-bold'>
        <h1 className='text-[40px]'>INFXR</h1>
        <ul className='flex gap-10'>
          <li className='hover:text-gray-400 cursor-pointer'>Home</li>
          <li className='hover:text-gray-400 cursor-pointer'>Services</li>
          <li className='hover:text-gray-400 cursor-pointer'>Work</li>
          <li className='hover:text-gray-400 cursor-pointer'>About</li>
          <li className='hover:text-gray-400 cursor-pointer'>Contact</li>
        </ul>
        <div>
          <p>Let's build --</p>
        </div>
      </div>
    </nav>
  );
};
