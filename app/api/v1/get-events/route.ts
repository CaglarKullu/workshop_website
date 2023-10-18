import { authOptions } from "@/lib/utils/auth";
import prisma from "@/lib/utils/prisma";
import {getServerSession } from "next-auth"

export async function GET(request: Request) {
    const data = await prisma.event.findUnique({
        where:{
            event_id:1
        }
    })
   
 /*    const session = await getServerSession(authOptions);
    if (session?.user.role === "ANON") {
        return Response.json({message:"hello word"})
    } */
    //return Response.json(JSON.stringify((session?.user)? session.user: {message:"no user"}))
    return Response.json(data);
}