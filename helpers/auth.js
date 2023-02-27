import { hash } from 'bcrypt';

export async function hashPassword(password) {
    const saltRounds = 12;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
}