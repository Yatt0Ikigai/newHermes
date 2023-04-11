import React, { useState } from 'react'

export default function UploadFileInput({ children, setFunction }: { children: React.ReactChild | React.ReactChildren, setFunction: (img: File) => void }) {
    return (
        <>
            <input type="file" id="uploadImageInput" onChange={
                (e) => {
                    if (e.target.files) {
                        const file = e.target.files[0];
                        setFunction(file)
                    }
                }
            } name="image" className='hidden' />
            <label htmlFor='uploadImageInput'> 
                {children}
            </label>
        </>
    )
}
