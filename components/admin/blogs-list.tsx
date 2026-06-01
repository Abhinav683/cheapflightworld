"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Eye, Edit2, Loader2 } from "lucide-react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  thumbnail: string;
  published: boolean;
  createdAt: string;
}

export function BlogsList() {
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
  const deleteBlog = async (slug: string) => {
    try {
      const response = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs((prev) =>
        prev.filter((blog) => blog.slug !== slug)
      );
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to delete blog"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center text-red-600">
        <p>Error: {error}</p>
        <Button onClick={fetchBlogs} className="mt-4">
          Retry
        </Button>
      </Card>
    );
  }
  console.log(blogs)
  return (
    <div className="w-full flex flex-col justify-center items-center  ">

      <div className="mb-8 flex flex-col gap-3  w-[90%] border p-4  bg-white rounded-2xl">
        {/* LEFT */}
        <div>

          <p className="mt-1 font-bold text-xl">
            Total Blogs : ( {blogs.length} )
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search blogs..."
            className="h-14 rounded-full border-slate-200 bg-white pl-11 pr-4  font-normal placeholder:font-normal placeholder:text-base shadow focus-visible:ring-1 focus-visible:ring-slate-300 "
          />
        </div>
      </div>

      {blogs.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-600 mb-4">No blog posts yet</p>
          <p className="text-sm text-gray-500">
            Create your first blog post using the form above
          </p>
        </Card>
      ) : (
        <div className="flex flex-col justify-between gap-4 w-[90%]">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="group p-0 overflow-hidden rounded-3xl border border-slate-200 bg-white  hover:border-slate-300 hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)]"
            >
              <div className="flex flex-col gap-6 p-3 lg:flex-row lg:items-center lg:justify-between">

                {/* LEFT */}
                <div className="flex min-w-0 flex-1 items-start gap-10">

                  {/* ICON */}
                  <div className="relative w-[130px] overflow-hidden bg-slate-100 lg:h-auto lg:w-[100px] rounded-2xl">
                    {blog?.thumbnail ? (
                        <img
                          src={blog.thumbnail}
                          alt={blog.title}
                          className="object-cover"
                        />
                        ) : (
                        <div className="flex h-[90px] w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                          <span className="text-sm font-medium text-slate-500">
                            No Image
                          </span>
                        </div>
                    )}
                      </div>
                  {/* CONTENT */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="truncate text-xl font-semibold tracking-tight text-slate-900">
                          {blog.title}
                        </h3>

                     
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                        <span className="font-medium text-slate-700">
                          {blog.author}
                        </span>

                        <span>•</span>

                        <span>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>

                        <span>•</span>

                        <span className="truncate">
                          /blog/{blog.slug}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(`/blog/${blog.slug}`, "_blank")
                      }
                      className="h-11 rounded-2xl border-slate-200 px-4"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="h-11 rounded-2xl border-slate-200 px-4"
                      onClick={() =>
                        window.location.href = `/admin/edit/${blog.slug}`
                      }
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="h-11 rounded-2xl px-4"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="rounded-3xl sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-semibold">
                            Delete Blog?
                          </DialogTitle>

                          <DialogDescription className="pt-2 text-sm leading-6 text-slate-500">
                            This action cannot be undone. This will permanently
                            delete this blog post from your platform.
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="mt-4 flex-row gap-3 sm:justify-end">
                          <Button
                            variant="outline"
                            className="rounded-xl"
                          >
                            Cancel
                          </Button>

                          <Button
                            variant="destructive"
                            className="rounded-xl"
                            onClick={() => deleteBlog(blog.slug)}
                          >
                            Confirm Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
            </Card>
          ))}

        </div>
      )}

    </div>
  );
}
