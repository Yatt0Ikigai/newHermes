export interface IUser {
    firstName: string,
    lastName: string,
    id: string,
}

export interface IChat {
    lastMessage: {
        author: string,
        message: string,
    },
    participants: IUser[],
    id: string,
}