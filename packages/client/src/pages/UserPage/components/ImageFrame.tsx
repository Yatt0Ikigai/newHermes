import React from 'react'

export default function ImageFrame({ Link }: { Link?: string }) {
    return (
        <div className='w-full overflow-hidden aspect-square rounded-2xl hover:brightness-125'>
            <div className='w-full h-full bg-slate-500'>
                &nbsp;
            </div>
        </div>
    )
}
