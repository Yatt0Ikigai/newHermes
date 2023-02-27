import React, { useEffect, useState } from 'react'
import { useParams, Navigate } from "react-router-dom";
import { getRequest, postRequest } from "../../utils/axios.util";

import storeLogin from "../../stores/loginStore";
import storeUser from '../../stores/userStore';
import storeFriends from '../../stores/friendStore';

import LoadingSpinner from '../../components/LoadingSpinner';
import Sidebar from '../../components/Sidebar';
import UserContainer from './components/UserContainer';

export default function UserPage() {
    const loginStore = storeLogin();
    const userStore = storeUser();
    const friendStore = storeFriends();

    return (
        <>
            <div className='box'>
                <Sidebar />
                <UserContainer />
            </div >
        </ >
    )
}
