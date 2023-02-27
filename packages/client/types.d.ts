export interface IUser {
    firstName: string,
    lastName: string,
    id: string,
}

export interface IMessage {
    id: string
    senderId: string,
    inboxId: string,
    message: string,
    createdAt: string,
}

export interface IChat {
    lastMessage: IMessage | null,
    participants: IUser[],
    id: string,
}

declare module '*.webp' {
    const value: any;
    export default value;
}

declare module "*.svg" {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.mp3';