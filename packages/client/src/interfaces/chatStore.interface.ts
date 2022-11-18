export interface IChat {
    messages: IMessage[],
    participants: IChatParticipant[]
    name: string | null,
    chatId: string,
    loading: boolean,
}

export interface IChatParticipant {
    firstName: string,
    lastName: string,
    id: string,
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
}
