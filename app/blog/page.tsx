"use client";

import { useEffect, useState } from "react";

import {
    BookOpen,
    ArrowRight,
    CalendarDays,
    Loader2,
    ChevronLeft,
    ChevronRight,
    Search,
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

interface PaginationData {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export default function BlogPostPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
            setCurrentPage(1);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        fetchBlogs(currentPage, debouncedSearchQuery);
    }, [currentPage, debouncedSearchQuery]);

    const fetchBlogs = async (page: number, search: string) => {
        try {
            setIsLoading(true);

            const params = new URLSearchParams();
            params.append("page", page.toString());
            params.append("limit", "9");
            if (search) params.append("search", search);

            const response = await fetch(`/api/blogs?${params.toString()}`);

            if (!response.ok) {
                throw new Error("Failed to fetch blogs");
            }

            const result = await response.json();

            setBlogs(result.data || []);
            setPagination(result.pagination || null);
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

    const handleSearch = (value: string) => {
        setSearchQuery(value);
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
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
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

                    {/* SEARCH BAR */}
                    <div className="mb-12 flex items-center gap-3 bg-white p-3 rounded-2xl shadow-md border border-slate-200 max-w-md">
                        <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full px-2 py-2 bg-transparent outline-none text-sm placeholder:text-slate-400"
                        />
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

                    {/* NO RESULTS MESSAGE */}
                    {!isLoading && blogs.length === 0 && (
                        <div className="mt-12 text-center py-12">
                            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                No articles found
                            </h3>
                            <p className="text-slate-600 mb-6">
                                {searchQuery
                                    ? `We couldn't find any articles matching "${searchQuery}". Try a different search term.`
                                    : "No articles available yet."}
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    )}

                    {/* PAGINATION CONTROLS */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="mt-16 flex flex-col items-center gap-6">
                            {/* PAGE INFO */}
                            <div className="text-center">
                                <p className="text-slate-600">
                                    Page {pagination.page} of {pagination.totalPages}
                                </p>
                                <p className="text-sm text-slate-500">
                                    Showing {blogs.length} of {pagination.total} articles
                                </p>
                            </div>

                            {/* PAGINATION BUTTONS */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={!pagination.hasPrev || isLoading}
                                    className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:border-slate-400 hover:enabled:bg-slate-50"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </button>

                                <div className="flex items-center gap-2">
                                    {Array.from({ length: pagination.totalPages }).map(
                                        (_, index) => {
                                            const pageNum = index + 1;
                                            const isActive = pageNum === currentPage;
                                            const isNearCurrent =
                                                Math.abs(pageNum - currentPage) <= 1;
                                            const isFirstOrLast =
                                                pageNum === 1 ||
                                                pageNum === pagination.totalPages;

                                            if (
                                                !isActive &&
                                                !isNearCurrent &&
                                                !isFirstOrLast
                                            ) {
                                                if (pageNum === 2 || pageNum === pagination.totalPages - 1) {
                                                    return (
                                                        <span
                                                            key={pageNum}
                                                            className="text-slate-500"
                                                        >
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            }

                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    disabled={isLoading}
                                                    className={`h-10 w-10 rounded-full font-semibold transition-all duration-300 disabled:cursor-not-allowed ${
                                                        isActive
                                                            ? "bg-black text-white"
                                                            : "border border-slate-300 bg-white text-slate-900 hover:border-slate-400 hover:bg-slate-50"
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        }
                                    )}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={!pagination.hasNext || isLoading}
                                    className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:border-slate-400 hover:enabled:bg-slate-50"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}