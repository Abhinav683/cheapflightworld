"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, Eye, Edit2, Loader2 } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  author: string;
  published: boolean;
  views: number;
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
  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete blog");
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete blog");
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

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Blog Posts</h2>
        <p className="text-gray-600">
          Total: {blogs.length} post{blogs.length !== 1 ? "s" : ""}
        </p>
      </div>

      {blogs.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-gray-600 mb-4">No blog posts yet</p>
          <p className="text-sm text-gray-500">
            Create your first blog post using the form above
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="p-4 md:p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        blog.published
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{blog.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    By {blog.author} •{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {blog.views} views
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/blog/${blog.slug}`, "_blank")}
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    disabled
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteBlog(blog.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
