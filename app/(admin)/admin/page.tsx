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
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

import {
  Plane,
  PlusCircle,
  List,
  LogOut,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-[#f8fafc] overflow-hidden w-screen">
        {/* SIDEBAR */}
        <Sidebar className="w-[280px] border-r border-slate-200 bg-white">
          <div className="flex h-full flex-col">
            {/* LOGO */}
            <SidebarHeader className="px-6 py-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <Plane className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Cheapflight
                  </h2>

                  <p className="text-xs text-slate-400">
                    Admin Dashboard
                  </p>
                </div>
              </div>
            </SidebarHeader>

            {/* NAVIGATION */}
            <SidebarContent className="flex-1 px-4 py-5">
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab("create")}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === "create"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <PlusCircle className="h-4 w-4" />
                  Create Blog
                </button>

                <button
                  onClick={() => setActiveTab("list")}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === "list"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <List className="h-4 w-4" />
                  All Blogs
                </button>
              </div>
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter className="border-t border-slate-100 p-4">
              <form action="/api/auth/logout" method="post">
                <Button className="h-11 w-full justify-start rounded-xl bg-transparent text-red-500 shadow-none hover:bg-red-50">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </form>
            </SidebarFooter>
          </div>
        </Sidebar>

        {/* MAIN */}
        <SidebarInset className="flex-1 overflow-hidden">
          <div className="flex h-full flex-col overflow-hidden">
            {/* TOPBAR */}
            <div className="border-b border-slate-200 bg-white px-8 py-5 ml-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    {activeTab === "create"
                      ? "Create Blog"
                      : "All Blogs"}
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage your content dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-8">
              {activeTab === "create" ? (
                <BlogUploadForm />
              ) : (
                <BlogsList />
              )}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}