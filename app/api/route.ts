import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json(
        {message: "GET request received in to API"}
    )
}

export async function POST(req : NextRequest){
    const body = await req.json()

    console.log(body);

    const message = "My Name Is "+body.name+" and "+body.age+" Years Old "+" My Favorite Subject is "+body.subject+"."+" My Favorite Color is "+body.color;

    console.log(message);

    return NextResponse.json(
        {message: "POST request received in to API"}
    )
}