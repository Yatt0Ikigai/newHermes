import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function UploadImage() {
    const [image, setImage] = useState<File>();
    const [desc, setDesc] = useState("");

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            if (!image) return;
            const formData = new FormData();
            formData.append("image", image);
            await axios.post("http://localhost:8080/uploadAvatar", formData, {
                withCredentials:true,
            });
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
            <input type="text" value={desc} onChange={(e) => setDesc(e.currentTarget.value)}/>
            <button type="submit">
                Submit
            </button>
        </form>
    )
}
