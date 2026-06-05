import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminSessionToken } from "@/lib/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const sessionToken =
      request.cookies.get("admin_session")?.value;

    const session = sessionToken
      ? verifyAdminSessionToken(sessionToken)
      : null;

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const adminUser = await prisma.adminUser.findUnique({
      where: {
        id: session.userId,
      },
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: "Blog slug is required" },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.delete({
      where: { slug },
    });

    return NextResponse.json(blog);
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    console.error("Error deleting blog:", error);

    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
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


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const body = await request.json();

    const updatedBlog = await prisma.blog.update({
      where: {
        slug,
      },
      data: {
        title: body.title,
        slug: body.slug,
        author: body.author,
        content: body.content,
        excerpt: body.excerpt,
        thumbnail: body.thumbnail || null,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        keywords: Array.isArray(body.keywords)
          ? body.keywords
          : [],
        tags: Array.isArray(body.tags) ? body.tags : [],
        ogImage: body.ogImage || null,
        readingTime:
          body.readingTime !== undefined
            ? Number(body.readingTime)
            : null,
        featured: body.featured ?? false,
        published: body.published ?? false,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to update blog",
      },
      {
        status: 500,
      }
    );
  }
}