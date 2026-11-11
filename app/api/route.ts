import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json(
        {message: "GET request received in to API"}
    )
}

export async function POST(req : NextRequest){
    const body = await req.json()

    await prisma.student.create(
        {
            data: {
                name : body.name,
                age: Number(body.age), // Convert age to number 
                city : body.city
            }
        }
    )


    return NextResponse.json({message: "Student created successfully"})
}

