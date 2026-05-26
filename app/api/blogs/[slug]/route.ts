import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json(blog);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}





export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const blog = await prisma.blog.findUnique({
            where: {
                slug,
            },
        });
        if (!blog) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Blog not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: blog,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}