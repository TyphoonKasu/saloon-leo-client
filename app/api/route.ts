import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json(
        {message: "GET request received in to API"}
    )
}

export async function POST(req : NextRequest){
    
}

