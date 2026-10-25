import React from 'react'

export const Main = () => {
    return (
        <main className='pt-50 pl-10 flex flex-col gap-10'>
            <div className='text-sofwhite'>
                <p>DIGITAL STUDIO / 001</p>
                <h1 className='font-bold text-[4em]'>WE BUILD WHAT YOU NEED</h1>
                <p className='w-150'>Websites, applications, and digital products that help businesses grow, scale, stay ahead.</p>
            </div>
            <div className='flex gap-10 text-obsidian'>
                <button className='p-5 bg-electric border-1 rounded'>Start a project --</button>
                <button className='text-sofwhite border-b-1 m-0 border-sofwhite'>View our work --</button>
            </div>
        </main>
    );
};
