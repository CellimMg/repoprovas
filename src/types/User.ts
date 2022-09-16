import { User } from "@prisma/client";

export type UserInsert = Omit<User, "id">;

export interface UserInsertSchema{
    email: string,
    password: string,
    confirmPassword: string
}

export function userInsertFromSchema(userSchema: UserInsertSchema): UserInsert{
    const {email, password}: UserInsert = userSchema;
    return {email, password};
}
