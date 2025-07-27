"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs"; 
import {getUserByEmail} from "@/data/user"
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail, emailTemplates } from '@/lib/email-service';

export const register = async (values:z.infer<typeof RegisterSchema>)=>{
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success){
        return {error:"Invalid fields"}
    }

    const {email,password,name} = validatedFields.data
    const hashPassword = await bcrypt.hash(password,10)

    const existingUser = await getUserByEmail(email)
    if (existingUser ){
        if ( !existingUser.password){
            const updatedUser = existingUser
            updatedUser.password = hashPassword
            
        }
        return { error: "Email already exist"}
    }

    await db.user.create({
        data:{
            name,
            email,
            password:hashPassword,
        }
    })
    
    const verficationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verficationToken.email,verficationToken.token);

    return {success:"Confirmation Email sent"}
}