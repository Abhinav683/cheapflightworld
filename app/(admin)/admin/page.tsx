"use client";

import { useState } from "react";

import BlogUploadForm from "@/components/admin/blog-upload-form";
import { BlogsList } from "@/components/admin/blogs-list";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  List,
  LogOut,
  ArrowRight,
  PlusCircle,
  Globe, // Placeholder icon for the website logo
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-slate-200 bg-slate-50 text-slate-900">
        
        {/* NEW SIDEBAR HEADER: Logo and Website Name */}
        <SidebarHeader className="px-6 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-4">
            {/* Logo Wrapper */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20">
              <Globe className="h-5 w-5" /> {/* Swap this with an <img> tag if you have an SVG asset */}
            </div>
            {/* Website Name */}
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-slate-900 text-base leading-none">
                Traveler
              </span>
              <span className="text-xs font-medium text-slate-400 mt-1">
                Admin Panel
              </span>
            </div>
          </div>
        </SidebarHeader>

        {/* SIDEBAR NAVIGATION */}
        <SidebarContent className="px-5 py-4">
          <div className="space-y-6">
            <SidebarMenu>
              {/* CREATE TAB */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("create")}
                  className={`group h-14 rounded-2xl border px-4 transition-all duration-300 ${
                    activeTab === "create"
                      ? "border-cyan-200 bg-cyan-50 text-cyan-900 shadow-md shadow-cyan-100"
                      : "border-transparent bg-slate-200/40 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${
                      activeTab === "create"
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-200 text-slate-500 group-hover:bg-slate-300 group-hover:text-slate-800"
                    }`}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold">
                      Create Blog
                    </span>
                    <span className={`text-xs ${activeTab === "create" ? "text-cyan-700/80" : "text-slate-500"}`}>
                      Publish new content
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* LIST TAB */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("list")}
                  className={`group mt-3 h-14 rounded-2xl border px-4 transition-all duration-300 ${
                    activeTab === "list"
                      ? "border-violet-200 bg-violet-50 text-violet-900 shadow-md shadow-violet-100"
                      : "border-transparent bg-slate-200/40 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${
                      activeTab === "list"
                        ? "bg-violet-500 text-white"
                        : "bg-slate-200 text-slate-500 group-hover:bg-slate-300 group-hover:text-slate-800"
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold">
                      All Blogs
                    </span>
                    <span className={`text-xs ${activeTab === "list" ? "text-violet-700/80" : "text-slate-500"}`}>
                      Manage blog posts
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarContent>

        <SidebarFooter className="p-5">
          <form action="/api/auth/logout" method="post">
            <Button className="h-12 w-full rounded-2xl text-red-500 bg-slate-200 font-medium 700 hover:bg-slate-300  border-none transition-colors shadow-none">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </SidebarFooter>
      </Sidebar>

      {/* MAIN CONTAINER */}
      <SidebarInset className="bg-slate-100 max-h-screen overflow-hidden">
        <main className="h-screen p-6 lg:p-10 flex flex-col justify-stretch">
          <div className="mx-auto w-full max-w-7xl h-full flex flex-col overflow-hidden">
            
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08)] flex flex-col h-full max-h-full">
              
              <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />
              </div>

              {/* Header block */}
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between shrink-0">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] font-semibold text-slate-400">
                    Dashboard Workspace
                  </p>

                  <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                    {activeTab === "create"
                      ? "Create a new blog post"
                      : "Manage your blogs"}
                  </h1>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                    Beautifully manage your travel content with a clean,
                    production-level editorial workspace.
                  </p>
                </div>

                {/* Status Mode Pill */}
                <div className="inline-flex h-fit items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm">
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                  {activeTab === "create"
                    ? "Publishing Mode"
                    : "Management Mode"}
                </div>
              </div>

              {/* Content Panel */}
              <div className="mt-10 flex-1 overflow-y-auto pr-2 -mr-2 min-h-0 custom-scrollbar">
                {activeTab === "create" ? (
                  <div className="rounded-[2rem] border border-slate-100 bg-slate-50/50 p-6 shadow-inner">
                    <BlogUploadForm />
                  </div>
                ) : (
                  <div className="rounded-[2rem] border border-slate-100 bg-slate-50/50 p-6 shadow-inner">
                    <BlogsList />
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}