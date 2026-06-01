"use client";

import { useEffect, useState } from "react";

import {
    BookOpen,
    ArrowRight,
    CalendarDays,
    Loader2,
} from "lucide-react";

import Link from "next/link";

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    author?: string;
    thumbnail?: string;
    createdAt: string;
}

export default function BlogPostPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setIsLoading(true);

            const response = await fetch("/api/blogs");

            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }

            const result = await response.json();

            setBlogs(result.data || []);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred"
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8f8f6]">
                <Loader2 className="h-10 w-10 animate-spin text-black" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8f8f6]">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f8f8f6] text-slate-900">
            {/* HERO SECTION */}
            <section className="w-full px-4 sm:px-6 lg:px-10 pt-24 pb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 overflow-hidden rounded-[2rem] bg-[#EEE9DF] shadow-sm">
                        {/* LEFT CONTENT */}
                        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full w-fit shadow-sm mb-6">
                                <BookOpen className="w-4 h-4 text-black" />

                                <span className="text-sm font-semibold">
                                    Travel Blog & Guides
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                                Inspiration
                                <br />
                                & Expert Guides
                            </h1>

                            <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-xl">
                                Discover curated itineraries, hidden gems,
                                travel hacks, and destination stories crafted
                                for modern explorers.
                            </p>

                            <div className="mt-10">
                                <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2 rounded-2xl shadow-md max-w-xl">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="w-full px-4 py-3 bg-transparent outline-none text-sm placeholder:text-slate-400"
                                    />

                                    <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2">
                                        Subscribe

                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="relative min-h-[350px] lg:min-h-full">
                            <img
                                src="/blog.jpg"
                                alt="Blog Hero"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl">
                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                                    <CalendarDays className="w-4 h-4" />

                                    Latest Story
                                </div>

                                <h3 className="text-xl font-bold leading-snug">
                                    10 Hidden Destinations You Need To Visit
                                    This Year
                                </h3>

                                <Link
                                    href="/blogs"
                                    className="inline-flex items-center gap-2 mt-4 text-sm font-semibold hover:gap-3 transition-all"
                                >
                                    Read Article

                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* LATEST ARTICLES */}
            <section className="px-4 sm:px-6 lg:px-10 pb-24">
                <div className="max-w-7xl mx-auto">
                    {/* SECTION HEADER */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">
                                Latest Posts
                            </p>

                            <h2 className="text-3xl sm:text-4xl font-bold">
                                Explore Recent Articles
                            </h2>
                        </div>

                        <Link
                            href="/blogs"
                            className="text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                        >
                            View All Articles

                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* BLOG GRID */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <article
                                key={blog.id}
                                className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white"
                            >
                                {/* IMAGE */}
                                <div className="relative">
                                    <img
                                        src={blog.thumbnail || "/blog.jpg"}
                                        alt={blog.title}
                                        className="h-64 w-full object-cover"
                                    />

                                    {/* TOP BADGE */}
                                    <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 backdrop-blur-md">
                                        Travel Story
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="p-7 ">
                                    {/* META */}
                                    <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4" />

                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </div>

                                        <div className="h-1 w-1 rounded-full bg-slate-300" />

                                        <div className="font-medium text-slate-700">
                                            By {blog?.author}
                                        </div>
                                    </div>

                                    {/* TITLE */}
                                    <h3 className="text-2xl font-bold leading-snug text-slate-900">
                                        {blog.title}
                                    </h3>

                                    {/* EXCERPT */}
                                    <p className="mt-2 line-clamp-3 text-[15px] leading-7 text-slate-600">
                                        {blog.excerpt}
                                    </p>

                                    {/* FOOTER */}
                                    <div className="mt-4 flex items-center justify-between">
                                        <Link
                                            href={`/blog/${blog.slug}`}
                                            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                                        >
                                            Read Article

                                            <ArrowRight className="h-4 w-4" />
                                        </Link>

                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}