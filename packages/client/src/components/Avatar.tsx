import React from 'react'

export default function Avatar({avatar, online}: {avatar:string, online:boolean}) {
    return (
        <div>
            <div className={`avatar ${online ? "online" : "offline"}`}>
                <div className="w-8 rounded-full">
                    <img src={avatar} />
                </div>
            </div>
        </div>
    )
}
