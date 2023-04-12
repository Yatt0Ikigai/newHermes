import React, { useState } from "react";

const Tab = ({
    header, placeholder, children
}: { header: string, placeholder?: string, children: React.ReactChild | React.ReactChildren }) => {
    const [active, setActive] = useState(false);

    return (
        <button className={`box-border flex items-center justify-between w-full gap-4 px-4 py-2 m-2 -translate-x-2 border-b border-accent ${active ? "" : "hover:bg-secondaryBackground"}`} onClick={() => setActive(true)}>
            <h3>{header}</h3>
            {
                active ?
                    children
                    :
                    <>
                        <span className='mr-auto text-gray-400'>{placeholder}</span>
                        <span className='text-primaryHighlight'>Edit</span>
                    </>

            }
        </button>
    );
}

export default Tab