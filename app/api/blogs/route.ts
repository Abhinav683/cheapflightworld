import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// CREATE SLUG
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// CREATE BLOG
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      content,
      excerpt,
      author,
      thumbnail,
      published,

      metaTitle,
      metaDescription,

      keywords,
      tags,

      ogImage,
      featured,
      readingTime,
    } = body;

    // VALIDATION
    if (!title || !content || !author) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // GENERATE SLUG
    const slug = generateSlug(title);

    // CHECK EXISTING BLOG
    const existingBlog = await prisma.blog.findUnique({
      where: {
        slug,
      },
    });

    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog already exists with this title",
        },
        { status: 400 }
      );
    }

    // CREATE BLOG
    const blog = await prisma.blog.create({
      data: {
        title,
        slug,

        content,

        excerpt:
          excerpt || content.replace(/<[^>]*>/g, "").slice(0, 160),

        author,

        thumbnail: thumbnail || null,

        metaTitle,
        metaDescription,

        keywords: keywords || [],
        tags: tags || [],

        ogImage: ogImage || null,

        published: published || false,
        featured: featured || false,

        readingTime: readingTime || 1,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        data: blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("BLOG CREATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
      },
      { status: 500 }
    );
  }
}

// GET BLOGS
export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        results: blogs.length,
        data: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("BLOG FETCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      { status: 500 }
    );
  }
}