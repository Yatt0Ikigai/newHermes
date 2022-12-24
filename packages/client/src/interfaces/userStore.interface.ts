export interface IUser {
    firstName: string,
    lastName: string,
    id: string,
}

export interface IChat {
    lastMessage: {
        author: string | null,
        message: string | null,
    },
    participants: IUser[],
    id: string,
}