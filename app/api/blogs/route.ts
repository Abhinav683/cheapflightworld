import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminSessionToken } from "@/lib/auth";

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
    const sessionToken = request.cookies.get("admin_session")?.value;
    const session = sessionToken ? verifyAdminSessionToken(sessionToken) : null;

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
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
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

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
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(12, Math.max(1, parseInt(searchParams.get("limit") || "9")));
    const searchQuery = searchParams.get("search")?.trim() || "";
    
    const skip = (page - 1) * limit;

    // Build where clause for search
    const whereClause = searchQuery
      ? {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" as const } },
            { excerpt: { contains: searchQuery, mode: "insensitive" as const } },
            { content: { contains: searchQuery, mode: "insensitive" as const } },
            { author: { contains: searchQuery, mode: "insensitive" as const } },
            { tags: { hasSome: [searchQuery] } },
          ],
        }
      : {};

    // Get total count
    const total = await prisma.blog.count({
      where: whereClause,
    });

    // Get paginated blogs
    const blogs = await prisma.blog.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        success: true,
        results: blogs.length,
        data: blogs,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
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