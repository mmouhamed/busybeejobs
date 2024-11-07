"use server";

import bcrypt from "bcryptjs";
import prisma from '../lib/prisma'
import { hash } from "crypto";
import { getUserByEmail } from '../data/user'

export const signup = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    return { success: "User created! "};

}