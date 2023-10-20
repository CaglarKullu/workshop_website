import prisma from "@/lib/utils/prisma";
import { NextResponse } from "next/server"

export const GET = async ()=>{
    try {
        const categories = await prisma.category.findMany();
        return NextResponse.json(categories, {status:200});
    } catch (error) {
        console.log(error);
       return NextResponse.json({ error: JSON.stringify(error)}, { status: 500 });
    }
}

