import axios from 'axios';
import React, { useEffect, useState } from 'react'
import storeAction from '../stores/actionStore'
import { getRequest } from '../utils/axios.util';

export default function Avatar({ id }: { id: string }) {
    const [link, setLink] = useState("");
    const actionStore = storeAction();

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getLink = async () => {
            if(!id) return;
            const res = await getRequest(`users/${id}/avatar`, source.token)
            setLink(res.data);
}
        getLink();
        return () => {
            source.cancel('Operation Canceled')
        }
    }, []);
    
    return (
        <div className={`avatar`}>
            <img src={link} />
        </div>
    )
}
