"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import slugify from "slugify";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import {
  Loader2,
  Upload,
  FileText,
  User,
  ImagePlus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Globe,
  Tags,
  Sparkles,
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
  Link2
} from "lucide-react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";

// -----------------------------
// VALIDATION SCHEMA
// -----------------------------

const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 10 characters"),

  excerpt: z
    .string()
    .min(30, "Excerpt must be at least 30 characters")
    .max(200, "Excerpt should be under 200 characters"),

  author: z.string().min(2),

  thumbnail: z.string().url().optional().or(z.literal("")),

  metaTitle: z
    .string()
    .min(5)
    .max(60, "SEO title should be under 60 characters"),

  metaDescription: z
    .string()
    .min(10)
    .max(160, "Meta description should be under 160 characters"),

  keywords: z.string(),

  tags: z.string(),

  ogImage: z.string().url().optional().or(z.literal("")),

  published: z.boolean(),

  featured: z.boolean(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

// -----------------------------
// SUB-COMPONENT: TIPTAP EDITOR
// -----------------------------

// Ensure useEffect is imported

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

    Link.configure({
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

  // Safe reset: Watch for parent form resets via useEffect
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

// -----------------------------
// MAIN COMPONENT
// -----------------------------

export default function BlogUploadForm() {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      author: "",
      thumbnail: "",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      tags: "",
      ogImage: "",
      published: false,
      featured: false,
    },
  });

  const title = watch("title");

  const generatedSlug = slugify(title || "", {
    lower: true,
    strict: true,
  });

  const onSubmit = async (data: BlogFormValues) => {
    try {
      setIsLoading(true);
      setMessage(null);

      const payload = {
        ...data,
        slug: generatedSlug,
        content,
        keywords: data.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        readingTime: Math.ceil(content.split(" ").length / 200),
      };

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create blog");
      }

      setMessage({
        type: "success",
        text: "Blog published successfully 🚀",
      });

      reset();
      setContent("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border-0 bg-white shadow-xl">
        {/* HEADER */}


        <div className="p-6 sm:p-8 lg:p-10">
          {/* ALERT */}
          {message && (
            <div
              className={`mb-8 flex items-center gap-3 rounded-2xl border px-5 py-4 ${message.type === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
                }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}

              <p className="font-medium">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            {/* CONTENT SECTION */}
            <div className="space-y-8 rounded-3xl border border-slate-200 bg-slate-50/50 p-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Blog Content
                </h2>
                <p className="mt-1 text-slate-500">
                  Main blog information and content.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* TITLE */}
                <div className="space-y-3 lg:col-span-2">
                  <Label className="text-sm font-semibold">Blog Title</Label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      {...register("title")}
                      placeholder="Enter blog title"
                      className="h-14 rounded-2xl border-slate-200 bg-white pl-12"
                    />
                  </div>
                  {errors.title && (
                    <p className="text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* SLUG */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">
                    Generated Slug
                  </Label>
                  <Input
                    value={generatedSlug}
                    disabled
                    className="h-14 rounded-2xl bg-slate-100"
                  />
                </div>

                {/* AUTHOR */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Author Name</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      {...register("author")}
                      placeholder="Author name"
                      className="h-14 rounded-2xl border-slate-200 bg-white pl-12"
                    />
                  </div>
                </div>

                {/* THUMBNAIL */}
                <div className="space-y-4 lg:col-span-2">
                  <Label className="text-sm font-semibold">
                    Blog Thumbnail
                  </Label>

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

                {/* EXCERPT */}
                <div className="space-y-3 lg:col-span-2">
                  <Label className="text-sm font-semibold">Blog Excerpt</Label>
                  <textarea
                    {...register("excerpt")}
                    rows={4}
                    placeholder="Write a short blog summary"
                    className="w-full resize-none rounded-3xl border border-slate-200 bg-white px-5 py-4 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* UNCOMMENTED & ACTIVATED EDITOR */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Blog Content Editor
                </Label>
                <BlogEditor content={content} onChange={setContent} />
              </div>
            </div>

            {/* SEO SECTION */}
            <div className="space-y-8 rounded-3xl border border-slate-200 bg-slate-50/50 p-8">
              <div className="flex items-center gap-3">
                <Globe className="h-7 w-7 text-slate-700" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    SEO Settings
                  </h2>
                  <p className="mt-1 text-slate-500">
                    Optimize your blog for Google and social media.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {/* META TITLE */}
                <div className="space-y-3 lg:col-span-2">
                  <Label className="text-sm font-semibold">Meta Title</Label>
                  <Input
                    {...register("metaTitle")}
                    placeholder="SEO title for Google"
                    className="h-14 rounded-2xl border-slate-200 bg-white"
                  />
                </div>

                {/* META DESCRIPTION */}
                <div className="space-y-3 lg:col-span-2">
                  <Label className="text-sm font-semibold">
                    Meta Description
                  </Label>
                  <textarea
                    {...register("metaDescription")}
                    rows={4}
                    placeholder="SEO description"
                    className="w-full resize-none rounded-3xl border border-slate-200 bg-white px-5 py-4 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* KEYWORDS */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">SEO Keywords</Label>
                  <div className="relative">
                    <Tags className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      {...register("keywords")}
                      placeholder="react,nextjs,seo"
                      className="h-14 rounded-2xl border-slate-200 bg-white pl-12"
                    />
                  </div>
                </div>

                {/* OG IMAGE */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">
                    Open Graph Image
                  </Label>
                  <Input
                    {...register("ogImage")}
                    placeholder="Social preview image URL"
                    className="h-14 rounded-2xl border-slate-200 bg-white"
                  />
                </div>

                {/* TAGS */}
                <div className="space-y-3 lg:col-span-2">
                  <Label className="text-sm font-semibold">Blog Tags</Label>
                  <Input
                    {...register("tags")}
                    placeholder="nextjs,typescript,backend"
                    className="h-14 rounded-2xl border-slate-200 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* PUBLISH SETTINGS */}
            <div className="space-y-8 rounded-3xl border border-slate-200 bg-slate-50/50 p-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Publish Settings
                </h2>
                <p className="mt-1 text-slate-500">
                  Control visibility and homepage promotion.
                </p>
              </div>

              <div className="space-y-6">
                {/* PUBLISHED */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Publish Immediately
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      Make blog visible to users instantly.
                    </p>
                  </div>
                  <Switch
                    checked={watch("published")}
                    onCheckedChange={(checked) =>
                      setValue("published", checked)
                    }
                  />
                </div>

                {/* FEATURED */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Featured Blog
                    </h4>
                    <p className="mt-1 text-sm text-slate-500">
                      Highlight on homepage.
                    </p>
                  </div>
                  <Switch
                    checked={watch("featured")}
                    onCheckedChange={(checked) => setValue("featured", checked)}
                  />
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                type="submit"
                disabled={isLoading}
                className="h-14 rounded-2xl bg-black px-8 text-base font-semibold text-white hover:bg-slate-800"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Publish Blog
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-14 rounded-2xl px-8"
                onClick={() => {
                  reset();
                  setContent("");
                }}
              >
                Reset Form
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </section>
  );
}