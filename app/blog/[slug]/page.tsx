import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import {
    ArrowLeft,
    CalendarDays,
    User2,
} from "lucide-react";

import Link from "next/link";

import { prisma } from "@/lib/prisma";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export const revalidate = 3600;

async function getBlog(slug: string) {
    const blog = await prisma.blog.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            content: true,
            thumbnail: true,
            createdAt: true,

            metaTitle: true,
            metaDescription: true,
            keywords: true,
            ogImage: true,

            author: true,
        },
    });

    return blog;
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: "Blog Not Found",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    return {
        title: blog.metaTitle || blog.title,

        description:
            blog.metaDescription || blog.excerpt,

        keywords: blog.keywords || [],

        openGraph: {
            title: blog.metaTitle || blog.title,

            description:
                blog.metaDescription ||
                blog.excerpt,

            type: "article",

            images: blog.ogImage
                ? [
                      {
                          url: blog.ogImage,
                          width: 1200,
                          height: 630,
                      },
                  ]
                : [],

            publishedTime:
                blog.createdAt.toISOString(),
        },

        twitter: {
            card: "summary_large_image",

            title:
                blog.metaTitle || blog.title,

            description:
                blog.metaDescription ||
                blog.excerpt,

            images: blog.ogImage
                ? [blog.ogImage]
                : [],
        },

        alternates: {
            canonical: `https://cheapflightworld.com/blog/${blog.slug}`,
        },
    };
}

export default async function ReadBlogPage({
    params,
}: Props) {
    const { slug } = await params;

    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#f7f7f5] text-slate-900">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context":
                            "https://schema.org",
                        "@type":
                            "BlogPosting",
                        headline: blog.title,
                        description:
                            blog.excerpt,
                        image:
                            blog.ogImage ||
                            blog.thumbnail,
                        datePublished:
                            blog.createdAt,
                        author: {
                            "@type": "Person",
                            name:
                                blog.author ||
                                "Admin",
                        },
                    }),
                }}
            />

            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="relative h-[70vh] min-h-125 w-full">
                    <Image
                        src={
                            blog.thumbnail ||
                            "/blog.jpg"
                        }
                        alt={blog.title}
                        fill
                        priority
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/10" />

                    <div className="absolute inset-0 z-10 flex items-end">
                        <div className="w-full px-4 sm:px-6 lg:px-10 pb-14">
                            <div className="relative bottom-18 flex flex-col gap-3 mx-auto max-w-5xl">
                                <div className="inline-flex w-fit items-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 text-sm font-medium text-white">
                                    Featured Article
                                </div>

                                <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
                                    {blog.title}
                                </h1>

                                <p className="max-w-3xl text-lg leading-8 text-white/80">
                                    {blog.excerpt}
                                </p>

                                <div className="flex flex-wrap items-center gap-6 text-white/80">
                                    <div className="flex items-center gap-2">
                                        <User2 className="h-4 w-4" />

                                        <span className="text-sm font-medium">
                                            {blog.author ||
                                                "Admin"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4" />

                                        <span className="text-sm">
                                            {new Date(
                                                blog.createdAt
                                            ).toLocaleDateString(
                                                "en-US",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="relative px-4 sm:px-6 lg:px-10 -mt-20 z-20 pb-24">
                <div className="mx-auto max-w-5xl">
                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white shadow-xl shadow-slate-200/40">
                        <article className="px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
                            {/* Author Card */}
                            <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-3xl border border-slate-200 bg-[#fafaf8] p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white text-lg font-bold">
                                        {(blog.author ||
                                            "A")
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold">
                                            {blog.author ||
                                                "Admin"}
                                        </h4>

                                        <p className="text-sm text-slate-500">
                                            Travel Writer &
                                            Storyteller
                                        </p>
                                    </div>
                                </div>

                                <div className="rounded-2xl bg-white px-4 py-3 border border-slate-200">
                                    <p className="text-xs text-slate-500">
                                        Published
                                    </p>

                                    <p className="mt-1 text-sm font-semibold">
                                        {new Date(
                                            blog.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div
                                className="prose prose-lg max-w-none prose-img:rounded-xl prose-headings:font-bold prose-p:text-slate-700"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        blog.content,
                                }}
                            />

                            {/* Footer */}
                            <div className="mt-16 border-t border-slate-200 pt-10">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div>
                                        <h3 className="text-2xl font-bold">
                                            Thanks for
                                            reading
                                        </h3>

                                        <p className="mt-2 text-slate-600">
                                            Explore more
                                            stories,
                                            guides and
                                            travel
                                            inspiration.
                                        </p>
                                    </div>

                                    <Link
                                        href="/blog"
                                        className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-slate-800"
                                    >
                                        Explore More
                                        Blogs

                                        <ArrowLeft className="h-4 w-4 rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}