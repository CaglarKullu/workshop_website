import prisma from "@/lib/utils/prisma";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

interface NewUserRequest{
    name: string;
    email: string;
    password: string;
    role: Role;
    ev_slug:string;

}

interface NewUserResponse{
    id: string;
    name: string;
    email: string;
    role: Role
}



export const POST = async (req: Request): Promise<NextResponse> =>{
const body =(await req.json()) as NewUserRequest;
const oldUSer = await prisma.user.findUnique({
    where:{
        email:body.email
    }
});

if (oldUSer) {
    return NextResponse.json(
        {error: "email in user"},{ status:422}
    );
}
const newUser= await prisma.user.create({data:body})

console.log(body);
return NextResponse.json({
    user: {
        id:newUser.id,
        name:newUser.name,
        email:newUser.email,
        role: newUser.role,
    },
})
};