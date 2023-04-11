import React, { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { toast } from "react-toastify";

export default function UploadImage() {
    const [image, setImage] = useState<File>();
    const [desc, setDesc] = useState("");

    const updateAv = trpc.users.changeAvatarLink.useMutation();

    const getLink = trpc.users.getUploadLink.useMutation({
        onSuccess: async (data) => {
            if( !image ) return;
            await fetch(data.data.link, {
                method: 'PUT',
                headers:{
                    "Content-Type": "multipart/form-data"
                },
                body: image
            }).then((data) => {
                console.log(data);
            })
            updateAv.mutate({
                key: data.data.name
            })
        }
    });



    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            if (!image) return;
            getLink.mutate()
        }}
            encType="multipart/form-data">
            <input type="file" onChange={
                (e) => {
                    if (e.target.files) {
                        const file = e.target.files[0];
                        setImage(file);
                    }
                }
            } name="image" />
            <input type="text" value={desc} onChange={(e) => setDesc(e.currentTarget.value)} />
            <button type="submit">
                Submit
            </button>
        </form>
    )
}
