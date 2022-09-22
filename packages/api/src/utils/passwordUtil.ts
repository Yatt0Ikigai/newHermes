import bcrypt from "bcrypt";

export async function validPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);

}

export async function genPassword(password: string) {
    return await bcrypt.hash(password, 10);
}