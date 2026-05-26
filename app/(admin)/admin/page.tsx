import { BlogsList } from "@/components/admin/blogs-list";
import BlogUploadForm from "@/components/admin/blog-upload-form";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  FileText,
  List,
  Sparkles,
  PenSquare,
} from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen overflow-hidden min-w-screen relative top-10">

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px]  rounded-full" />
      </div>

      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-14">
        <div className="max-w-7xl mx-auto">

          {/* HERO HEADER */}
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white shadow-2xl mb-10">

            {/* GLOW EFFECTS */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-12 lg:py-16">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

                {/* LEFT CONTENT */}
                <div className="max-w-3xl">

                  {/* BADGE */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6">
                    <Sparkles className="w-4 h-4" />

                    <span className="text-sm font-medium tracking-wide">
                      Admin Dashboard
                    </span>
                  </div>

                  {/* TITLE */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                    Blog Administration
                  </h1>

                  {/* DESCRIPTION */}
                  <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl">
                    Create, manage, and publish premium travel blogs
                    with a modern content management experience.
                  </p>
                </div>

                {/* RIGHT ICON */}
                <div className="hidden lg:flex items-center justify-center w-36 h-36 rounded-[2.5rem] bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">
                  <PenSquare className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="rounded-[2rem p-4 sm:p-6 lg:p-8">

            <Tabs defaultValue="create" className="w-full">

              {/* TABS */}
              <TabsList className="grid grid-cols-2 w-full h-16 rounded-2xl bg-slate-100 p-2 mb-8">

                <TabsTrigger
                  value="create"
                  className="
                    rounded-xl
                    text-sm
                    sm:text-base
                    font-semibold
                    flex
                    items-center
                    gap-2
                    transition-all
                    duration-300
                    data-[state=active]:bg-black
                    data-[state=active]:text-white
                    data-[state=active]:shadow-lg
                  "
                >
                  <FileText className="w-4 h-4" />
                  Create Blog
                </TabsTrigger>

                <TabsTrigger
                  value="list"
                  className="
                    rounded-xl
                    text-sm
                    sm:text-base
                    font-semibold
                    flex
                    items-center
                    gap-2
                    transition-all
                    duration-300
                    data-[state=active]:bg-black
                    data-[state=active]:text-white
                    data-[state=active]:shadow-lg
                  "
                >
                  <List className="w-4 h-4" />
                  All Blogs
                </TabsTrigger>
              </TabsList>

              {/* CREATE TAB */}
              <TabsContent
                value="create"
                className="focus-visible:outline-none"
              >
                <div className="animate-in fade-in-50 duration-500">
                  <BlogUploadForm />
                </div>
              </TabsContent>

              {/* BLOG LIST TAB */}
              <TabsContent
                value="list"
                className="focus-visible:outline-none"
              >
                <div className="animate-in fade-in-50 duration-500 rounded-[2rem] border border-slate-200 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
                  <BlogsList />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  );
}