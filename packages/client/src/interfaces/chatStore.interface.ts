export interface IChat {
    name: string,
    id: string,
    lastMessage: IMessage | null,
    participants: {
        firstName: string,
        lastName: string,
        id: string
    }[]
}

export interface ISendMess {
    senderId: string,
    chatId: string,
    message: string
}

export interface IMessage {
    messageId: string
    senderId: string,
    chatId: string,
    message: string,
    timeStamp: string,
    author: string,
}
