import prisma from "@/lib/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: {params: { slug: string }}) {

    const categorySlug = context.params.slug.toString();
  try {
    const category = await prisma.category.findUnique({
        where:{
            category_slug:categorySlug,
        },
    });
    return NextResponse.json(category, {status:200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: JSON.stringify(error)}, { status: 500 });
  }

  }