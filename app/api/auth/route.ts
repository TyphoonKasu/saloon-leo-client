import { Status } from "@/app/generated/prisma/enums";
import userAuthenticationRequestSchema from "@/dto/userAuthenticationRequest";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json()

        const parsedBody = userAuthenticationRequestSchema.safeParse(body);

        if(!parsedBody.success) {
            return NextResponse.json(
                {
                    message : parsedBody.error.issues[0].message
                },
                {
                    status : 400
                }
            )
        }

        const user = await prisma.user.findFirst(
            {
                where : {
                    email : body.email
                }
            }
        )

        if(user == null) {
            return NextResponse.json(
                {
                    message : "User not found"
                },
                {
                    status : 404
                }
            )
        }

        if(user.status != Status.ACTIVE) {
            return NextResponse.json(
                {
                    message : "User is not active"
                },
                {
                    status : 403
                }
            )
        }

        const isPasswordValid = await compare(body.password, user.password);

        if(!isPasswordValid) {
            return NextResponse.json(
                {
                    message : "Invalid password"
                },
                {
                    status : 401
                }
            )
        }

        const userInfomation = {
            id : user.id,
            email : user.email,
            firstName : user.firstName,
            lastName : user.lastName,
            role : user.role,
            image : user.image,
            permissions : user.permissions
        }

        const signature = process.env.JOSE_JWT_SECRET
        
        const signatureEncoded = new TextEncoder().encode(signature)

        const token = await new jose.SignJWT(userInfomation).setProtectedHeader({alg : "HS256"}).setExpirationTime("48h").sign(signatureEncoded)

        const response = NextResponse.json(
            {
                message : "You logged in successfully",
            },
            {
                status : 200
            }
        )
        response.cookies.set(
            {
                name : "auth-token",
                value : token,
                httpOnly : true,
                secure : false,
                sameSite : "lax",
                maxAge : 60 * 60 * 24 * 2, // 2 days
            }
        )
        
        return response

    }catch (error) {
        return NextResponse.json(
            {
                message : "Error authenticating user"
            },
            {
                status : 500
            }
        )
    }
}