import axios from 'axios';
import React, { useEffect, useState } from 'react'
import storeAction from '../stores/actionStore'
import { getRequest } from '../utils/axios.util';
import { trpc } from '../utils/trpc';



export default function Avatar({ id }: { id: string | null }) {
    const { data } = trpc.users.getAvatar.useQuery({ id });
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`avatar`}>
            {
                !isLoaded && <div className='aspect-square'></div>
            }
            <img 
            src={data?.data ? data.data?.avatar : ""} 
            onLoad={() => setIsLoaded(true)}
            className={`object-fill ${isLoaded ? "" : "hidden"}`}
            />
        </div>
    )
}
