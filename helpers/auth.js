import { hash, compare } from 'bcrypt';

export async function hashPassword(password) {
    const saltRounds = 12;
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword)
    return isValid;
}