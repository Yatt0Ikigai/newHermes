import React, { useState } from 'react'
import Tab from './Index';
import UploadFileInput from "../../../../components/UploadFileInput";
import { trpc } from "../../../../utils/trpc";
import { toast } from "react-toastify";

export default function ApperanceTab() {
    const [avatar, setAvatar] = useState<File | null>(null);
    const updateAv = trpc.users.changeAvatarLink.useMutation({
        onSuccess: () => {
            toast("Succesfully updated avatar!");
        }
    });

    const getLink = trpc.users.getUploadLink.useMutation({
        onSuccess: async (data) => {
            if( !avatar ) return;
            await fetch(data.data.link, {
                method: 'PUT',
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                body: avatar
            })
            updateAv.mutate({
                key: data.data.name
            })
        }
    });


    
    return (
        <section className='w-full'>
            <h2 className='py-4 text-xl border-b border-white'>Appearance settings</h2>
            <Tab
                header='Avatar'>
                <div className='flex justify-center grow'>
                    <form className='flex flex-col gap-4' onSubmit={(e) => {
                        e.preventDefault();
                        if (!avatar) return;
                        getLink.mutate();
                    }}>
                        <span>Choosen file: {avatar ? avatar.name.slice(0,20) : "File not choosen"}</span>
                        <UploadFileInput setFunction={(img: File) => { setAvatar(img) }}>
                            <span className='px-4 py-2 bg-primaryHighlight rounded-xl'>Search for file</span>
                        </UploadFileInput>
                        <button type='submit' className='px-4 py-2 text-xl font-bold bg-tertiaryBackground rounded-xl'>Upload avatar</button>
                    </form>
                </div>
            </Tab>
        </section>
    )
}
