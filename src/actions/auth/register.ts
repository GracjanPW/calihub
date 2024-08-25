"use server";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { signupCredentialsSchema } from "@/schema/authSchema";
import {genSaltSync, hashSync} from "bcryptjs";
import { z } from "zod";
import { createVerificationToken } from "@/data/verify-token";
import { sendVerificationEmail } from "@/lib/email/emails";


/**
 * Sign up user
 * @param data - object
 * @param data.name - string
 * @param data.email - string
 * @param data.password - string
 * @returns object
 * @returns object.error - string   
 * @returns object.success - string
 *
*/

export default async function signup(data: z.infer<typeof signupCredentialsSchema>) {
    
    const validationResult = signupCredentialsSchema.safeParse(data);
    if (!validationResult.success) return {error: "Invalid fields"}
    
    const {name, email, password} = data;
    const user = await getUserByEmail(email);
    if (user) return {error: "User with that email already exists"}

    const hashedPassword = hashSync(password, genSaltSync(10));
    const newUser = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    if (!newUser) return {error: "Couldn't create user, try again later"}


    const verificationToken = await createVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {success: "Confirmation Email Sent!"}

}