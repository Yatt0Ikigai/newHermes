import { prisma } from "../utils/prisma";
import { Prisma, Users } from "@prisma/client";
import bcrypt from "bcrypt"

export const createUserHandler = async ({email, password, firstName, lastName}: {email:string, password:string, firstName: string, lastName:string}) => {
    try {
        const user = await findUser({ email })
        if (user === null) {
            const newUser = await createUser({
                email: email.toLowerCase(),
                password: await bcrypt.hash(password, 10),
                firstName: firstName,
                lastName: lastName,
                avatar: "",
                isOnline: false,
            });
            return newUser;
        } else throw new Error("User already exists");
    } catch (e) {
        console.log(e);
    }
}

export const createUser = async (input: Prisma.UsersCreateInput) => {
    return (await prisma.users.create({
        data: input,
    }) as Users)
}

export const findUser = async (
    where: Partial<Prisma.UsersWhereInput>,
    select?: Prisma.UsersSelect) => {
    return select ? await prisma.users.findFirst({ where, select }) as Users : await prisma.users.findFirst({ where }) as Users;
}