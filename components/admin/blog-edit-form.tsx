"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Loader2,
  FileText,
  ArrowLeft,
  Save,
  Globe,
  Tags,
  User,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Props {
  slug: string;
}

interface FormData {
  title: string;
  slug: string;

  content: string;
  excerpt: string;

  author: string;

  thumbnail?: string;

  metaTitle?: string;
  metaDescription?: string;

  keywords: string;
  tags: string;

  ogImage?: string;

  readingTime?: number;

  featured: boolean;
  published: boolean;
}

export default function EditBlogForm({ slug }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      author: "",
      thumbnail: "",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      tags: "",
      ogImage: "",
      readingTime: 0,
      featured: false,
      published: false,
    },
  });

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/blogs/${slug}`);

      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }

      const result = await response.json();

      const blog = result.data;

      reset({
        title: blog.title || "",
        slug: blog.slug || "",
        content: blog.content || "",
        excerpt: blog.excerpt || "",
        author: blog.author || "",
        thumbnail: blog.thumbnail || "",
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",

        keywords: blog.keywords?.join(", ") || "",
        tags: blog.tags?.join(", ") || "",

        ogImage: blog.ogImage || "",

        readingTime: blog.readingTime || 0,

        featured: blog.featured || false,
        published: blog.published || false,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to fetch blog",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsUpdating(true);

      setMessage(null);

      const response = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,

          keywords: data.keywords
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),

          tags: data.tags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),

          readingTime: Number(data.readingTime),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      setMessage({
        type: "success",
        text: "Blog updated successfully",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to update blog",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* TOP BAR */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button
                variant="outline"
                className="h-12 rounded-2xl"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>

            <div>
              <h1 className="text-3xl font-bold">
                Edit Blog
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Update your blog content
              </p>
            </div>
          </div>
        </div>

        {/* ALERT */}
        {message && (
          <div
            className={`flex items-center gap-3 rounded-2xl border px-5 py-4 ${
              message.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}

            <p>{message.text}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <Card className="rounded-[32px] p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <FileText className="h-6 w-6 text-slate-700" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  Blog Information
                </h2>

                <p className="text-sm text-slate-500">
                  Edit blog details
                </p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              
              <div className="space-y-3 lg:col-span-2">
                <Label>Blog Title</Label>

                <Input
                  {...register("title")}
                  className="h-14 rounded-2xl"
                />
              </div>

              <div className="space-y-3">
                <Label>Slug</Label>

                <Input
                  {...register("slug")}
                  className="h-14 rounded-2xl"
                />
              </div>

              <div className="space-y-3">
                <Label>Author</Label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <Input
                    {...register("author")}
                    className="h-14 rounded-2xl pl-12"
                  />
                </div>
              </div>

              <div className="space-y-3 lg:col-span-2">
                <Label>Thumbnail</Label>

                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <Input
                    {...register("thumbnail")}
                    className="h-14 rounded-2xl pl-12"
                  />
                </div>
              </div>

              <div className="space-y-3 lg:col-span-2">
                <Label>Excerpt</Label>

                <textarea
                  {...register("excerpt")}
                  className="min-h-[120px] w-full rounded-3xl border p-5 outline-none"
                />
              </div>

              <div className="space-y-3 lg:col-span-2">
                <Label>Content</Label>

                <textarea
                  {...register("content")}
                  className="min-h-[400px] w-full rounded-3xl border p-5 outline-none"
                />
              </div>
            </div>
          </Card>

          <Card className="rounded-[32px] p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Globe className="h-6 w-6 text-slate-700" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  SEO Settings
                </h2>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Input
                {...register("metaTitle")}
                placeholder="Meta title"
                className="h-14 rounded-2xl"
              />

              <Input
                {...register("ogImage")}
                placeholder="OG image"
                className="h-14 rounded-2xl"
              />

              <Input
                {...register("keywords")}
                placeholder="react,nextjs"
                className="h-14 rounded-2xl"
              />

              <Input
                {...register("tags")}
                placeholder="frontend,backend"
                className="h-14 rounded-2xl"
              />
            </div>
          </Card>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isUpdating}
              className="h-14 rounded-2xl px-8"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={fetchBlog}
              className="h-14 rounded-2xl px-8"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}