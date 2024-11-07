"use server";

import { AuthError } from "next-auth";
import { signIn } from "../auth"
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { getUserByEmail } from "../data/user";

export const login = async (email, password) => {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false
        });

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        
        throw error;
    }
}