import axios from 'axios';
import React, { useEffect, useState } from 'react'
import storeAction from '../stores/actionStore'
import { getRequest } from '../utils/axios.util';
import { trpc } from '../utils/trpc';



export default function Avatar({ id }: { id: string }) {
    const { data } = trpc.users.getAvatar.useQuery({ id });

    return (
        <div className={`avatar`}>
            <img src={data?.data ? data.data?.avatar : ""} />
        </div>
    )
}
