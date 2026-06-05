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
  Upload,
  CheckCircle2,
  AlertCircle,
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  UnderlineIcon,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";

// ========================================
// EDITOR COMPONENT
// ========================================

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
}

function BlogEditor({ content, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),

      BulletList,
      OrderedList,
      ListItem,

      Underline,

      Highlight,

      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),

      Image,

      Placeholder.configure({
        placeholder: "Write an amazing blog post...",
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[400px] p-6 focus:outline-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content === "" && editor.getHTML() !== "") {
      editor.commands.setContent("");
    }
  }, [content, editor]);

  if (!editor) return null;

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "Enter URL",
      previousUrl || "https://"
    );

    if (url === null) return;

    if (url === "") {
      editor
        .chain()
        .focus()
        .unsetLink()
        .run();

      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
        target: "_blank",
      })
      .run();
  };

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-black">
      {/* Toolbar */}
      <div className="overflow-hidden rounded-3xl border bg-white">
        <div className="flex flex-wrap gap-2 border-b p-3">
          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleBold().run()
            }
          >
            <Bold size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleItalic().run()
            }
          >
            <Italic size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleUnderline().run()
            }
          >
            <UnderlineIcon size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleStrike().run()
            }
          >
            <Strikethrough size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 1 })
                .run()
            }
          >
            <Heading1 size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 2 })
                .run()
            }
          >
            <Heading2 size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleBulletList().run()
            }
          >
            <List size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
          >
            <ListOrdered size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
          >
            <Quote size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={addLink}
          >
            <Link2 size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor
                .chain()
                .focus()
                .setTextAlign("left")
                .run()
            }
          >
            <AlignLeft size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor
                .chain()
                .focus()
                .setTextAlign("center")
                .run()
            }
          >
            <AlignCenter size={16} />
          </Button>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() =>
              editor
                .chain()
                .focus()
                .setTextAlign("right")
                .run()
            }
          >
            <AlignRight size={16} />
          </Button>
        </div>

        {/* Editor Space */}
        <div onClick={() => editor.chain().focus().run()} className="cursor-text">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

interface Props {
  slug: string;
}

interface FormData {
  title: string;
  slug: string;

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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [content, setContent] = useState("");

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

      setContent(blog.content || "");
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

          content,

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
  const updateThumbnail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploadingImage(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setValue("thumbnail", data.url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploadingImage(false);
    }
  }
  if (isLoading) {
    return (
      <div className="flex min-h-125 items-center justify-center">
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
            className={`flex items-center gap-3 rounded-2xl border px-5 py-4 ${message.type === "success"
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

              <div className="space-y-4 lg:col-span-2">
                <Label>Blog Thumbnail</Label>

                <Input
                  type="hidden"
                  {...register("thumbnail")}
                />

                <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6">
                  <input
                    type="file"
                    id="thumbnailUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      updateThumbnail(e);
                    }}
                  />

                  <label
                    htmlFor="thumbnailUpload"
                    className="flex cursor-pointer flex-col items-center justify-center gap-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                      {uploadingImage ? (
                        <Loader2 className="h-7 w-7 animate-spin text-slate-600" />
                      ) : (
                        <Upload className="h-7 w-7 text-slate-600" />
                      )}
                    </div>

                    <div className="text-center">
                      <p className="text-base font-semibold text-slate-900">
                        {uploadingImage
                          ? "Uploading image..."
                          : "Upload Blog Thumbnail"}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        PNG, JPG, WEBP supported
                      </p>
                    </div>
                  </label>

                  {watch("thumbnail") && (
                    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
                      <img
                        src={watch("thumbnail")}
                        alt="Thumbnail Preview"
                        className="h-[260px] w-full object-cover"
                      />
                    </div>
                  )}
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
                <Label>Blog Content Editor</Label>

                <BlogEditor content={content} onChange={setContent} />
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