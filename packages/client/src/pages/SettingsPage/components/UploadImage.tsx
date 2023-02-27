import React, { useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { toast } from "react-toastify";

export default function UploadImage() {
    const [image, setImage] = useState<File>();
    const [desc, setDesc] = useState("");

    const updateAv = trpc.users.changeAvatarLink.useMutation();

    const getLink = trpc.users.getUploadLink.useMutation({
        onSuccess: async (data) => {
            toast.promise(
                async () => {
                    const formData = new FormData();
                    const img = {
                        ...data.data.link.fields,
                        'Content-Type': image?.type,
                        file: image
                    }
                    for (const name in img) formData.append(name, img?.file?.name as string)
                    await fetch(data.data.link.url, {
                        method: 'POST',
                        body: formData,
                    });
                    updateAv.mutate({ key: data.data.link.fields.key })
                },
                {
                    pending: {
                        render() {
                            return "Uploading avatar"
                        },
                        icon: false,
                    },
                    success: {
                        render() {
                            return `Succesfully uploaded avatar!`
                        },
                        // other options
                        icon: "🟢",
                    },
                    error: {
                        render() {
                            return 'Something failed'
                        },
                        icon: '❌'
                    }
                }
            )
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
