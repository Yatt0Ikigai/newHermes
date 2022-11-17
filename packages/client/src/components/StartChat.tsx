import React, { useState } from 'react'
import userStore from '../stores/userStore';
import store from "../stores/userStore";

export default function StartChat() {
    const storeUser = store();
    const [selectedChat, setSelectedChat] = useState<string | null>(null)
    const [filterChat, setFilterChat] = useState<string>("");

    return (
        <div>
            <input type="checkbox" id="my-modal-20" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Start new chat</h3>
                    <div>
                        {
                            storeUser.friendList.map(({ firstName, lastName, id }) => {
                                const wholeName = firstName + " " + lastName;
                                if (wholeName.toLocaleLowerCase().includes(filterChat.toLocaleLowerCase()))
                                    return (
                                        <div key={id} onClick={() => {
                                            storeUser.startChat(id);
                                        }} className={`${id === selectedChat ? "bg-yellow-100" : ""}`}>
                                            <button onClick={async () => {
                                                await storeUser.startChat(id)
                                            }}>
                                                {firstName} {lastName}
                                            </button>
                                        </div>
                                    )
                            })
                        }
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal-20" className="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
