import userRegistrationRequestSchema from "@/dto/userRegistrationRequest";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {

    try {
        const body = await req.json();

//safely validate and print error................................

        const validatedBody = userRegistrationRequestSchema.safeParse(body);

        console.log(validatedBody)

        if(!validatedBody.success) {
            return NextResponse.json(
                {
                    message : validatedBody.error.issues[0].message
                },
                {
                    status : 400
                }
            )
        }

        
        const existingUser = await prisma.user.findFirst(
            {
                where : {
                    email : body.email
                }
            }
        )

        if(existingUser != null){
            return NextResponse.json(
                {
                    message : "User already exists"
                },
                {
                    status : 400
                }
            )
        }

        const passwordHash = await bcrypt.hash(body.password, 12);

        await prisma.user.create(
            {
                data: {
                    firstName : body.firstName,
                    lastName : body.lastName,
                    email : body.email,
                    password : passwordHash
                }
            }
        )
    
        return NextResponse.json(
            {
                message : "User created successfully"
            }
        )
    }catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message : "User not created successfully"
            },
            {
                status : 500
            }
        )
    }
}