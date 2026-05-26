"use client";

import { useEffect, useState } from "react";
import { use } from "react";

import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    Loader2,
    Share2,
    User2,
} from "lucide-react";

import Link from "next/link";

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    thumbnail?: string;
    createdAt: string;
    author?: string;
    readingTime?: number;
}

export default function ReadBlogPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const [blog, setBlog] = useState<Blog | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        try {
            setIsLoading(true);
        
        const response = await fetch(`/api/blogs/${slug}`);
            console.log(response)
            if (!response.ok) {
                throw new Error("Failed to fetch blog");
            }

            const result = await response.json();

            setBlog(result.data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5]">
                <Loader2 className="h-10 w-10 animate-spin text-black" />
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f7f5] px-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                    <p className="text-lg font-medium text-red-500">
                        {error || "Blog not found"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7f7f5] text-slate-900">
            {/* HERO */}
            <section className="relative overflow-hidden">
                {/* IMAGE */}
                <div className="relative h-[70vh] min-h-[500px] w-full">
                    <img
                        src={blog.thumbnail || "/blog.jpg"}
                        alt={blog.title}
                        className="h-full w-full object-cover"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

                    {/* TOP NAV */}
                    <div className="absolute left-0 right-0 top-0 z-20 px-4 sm:px-6 lg:px-10 py-6">
                        <div className="mx-auto flex max-w-7xl items-center justify-between">
                            <Link
                                href="/blogs"
                                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/20"
                            >
                                <ArrowLeft className="h-4 w-4" />

                                Back to Blogs
                            </Link>

                            <button className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/20">
                                <Share2 className="h-4 w-4" />

                                Share
                            </button>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="absolute inset-0 z-10 flex items-end">
                        <div className="w-full px-4 sm:px-6 lg:px-10 pb-14">
                            <div className="mx-auto max-w-5xl">
                                {/* BADGE */}
                                <div className="mb-6 inline-flex items-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 text-sm font-medium text-white">
                                    Featured Article
                                </div>

                                {/* TITLE */}
                                <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
                                    {blog.title}
                                </h1>

                                {/* EXCERPT */}
                                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
                                    {blog.excerpt}
                                </p>

                                {/* META */}
                                <div className="mt-8 flex flex-wrap items-center gap-6 text-white/80">
                                    <div className="flex items-center gap-2">
                                        <User2 className="h-4 w-4" />

                                        <span className="text-sm font-medium">
                                            {blog.author || "Admin"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4" />

                                        <span className="text-sm">
                                            {new Date(
                                                blog.createdAt
                                            ).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Clock3 className="h-4 w-4" />

                                        <span className="text-sm">
                                            {blog.readingTime || 5} min read
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="relative px-4 sm:px-6 lg:px-10 -mt-20 z-20 pb-24">
                <div className="mx-auto max-w-5xl">
                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white shadow-xl shadow-slate-200/40">
                        {/* ARTICLE */}
                        <article className="px-6 sm:px-10 lg:px-16 py-10 sm:py-14">
                            {/* AUTHOR CARD */}
                            <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-3xl border border-slate-200 bg-[#fafaf8] p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white text-lg font-bold">
                                        {(blog.author || "A")
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold">
                                            {blog.author || "Admin"}
                                        </h4>

                                        <p className="text-sm text-slate-500">
                                            Travel Writer & Storyteller
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
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

                                    <div className="rounded-2xl bg-white px-4 py-3 border border-slate-200">
                                        <p className="text-xs text-slate-500">
                                            Reading Time
                                        </p>

                                        <p className="mt-1 text-sm font-semibold">
                                            {blog.readingTime || 5} mins
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* BLOG CONTENT */}
                            <div
                                className="
                                    prose 
                                    prose-slate 
                                    prose-lg 
                                    max-w-none
                                    
                                    prose-headings:font-bold
                                    prose-headings:tracking-tight
                                    
                                    prose-h1:text-5xl
                                    prose-h2:text-4xl
                                    prose-h3:text-3xl
                                    
                                    prose-p:text-slate-700
                                    prose-p:leading-8
                                    
                                    prose-a:text-black
                                    
                                    prose-img:rounded-3xl
                                    
                                    prose-blockquote:border-l-black
                                    prose-blockquote:bg-slate-50
                                    prose-blockquote:rounded-r-2xl
                                    prose-blockquote:px-6
                                    prose-blockquote:py-2
                                "
                                dangerouslySetInnerHTML={{
                                    __html: blog.content,
                                }}
                            />

                            {/* FOOTER */}
                            <div className="mt-16 border-t border-slate-200 pt-10">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div>
                                        <h3 className="text-2xl font-bold">
                                            Thanks for reading
                                        </h3>

                                        <p className="mt-2 text-slate-600">
                                            Explore more stories, guides, and
                                            travel inspiration.
                                        </p>
                                    </div>

                                    <Link
                                        href="/blogs"
                                        className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                                    >
                                        Explore More Blogs

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